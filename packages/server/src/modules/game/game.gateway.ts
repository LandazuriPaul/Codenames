import { Logger, UseInterceptors } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import {
  CellRevealedEnvelope,
  CellSelectedEnvelope,
  GameEvent,
  GameReadyEnvelope,
  GameSettings,
  Teams,
} from '@codenames/domain';

import { Game, Timer } from '~/entities';
import { RedisPropagatorInterceptor } from '~/modules/shared/redisPropagator/redisPropagator.interceptor';
import { AuthenticatedSocket } from '~/modules/shared/socket/authenticatedSocket.interface';
import { SocketService } from '~/modules/shared/socket/socket.service';
import { RoomService } from '~/modules/room/room.service';

import { GameService } from './game.service';

@UseInterceptors(RedisPropagatorInterceptor)
@WebSocketGateway({ serveClient: false })
export class GameGateway {
  private logger = new Logger(GameGateway.name);

  constructor(
    private readonly gameService: GameService,
    private readonly roomService: RoomService,
    private readonly socketService: SocketService
  ) {}

  @SubscribeMessage(GameEvent.GenerateGame)
  async onGenerateGame(
    @ConnectedSocket()
    {
      user: {
        room: { _id },
      },
    }: AuthenticatedSocket,
    @MessageBody() settings: GameSettings
  ): Promise<void> {
    // refetch to get the most actual room data
    const room = await this.roomService.getRoom(_id);
    const { board, firstTurn } = this.gameService.generateBoard(settings.board);
    const timer = new Timer(settings.timer.guess, settings.timer.hint);
    const game = new Game(board, firstTurn, timer);
    await this.roomService.initRoomGame(room, game, settings.teams);
    const teams: Teams = room.teams.toJSON();
    const newGame: GameReadyEnvelope = {
      game: game.toJSON(),
      teams,
    };
    this.socketService.emitToRoom(room, GameEvent.GameReady, newGame);
  }

  @SubscribeMessage(GameEvent.SelectCell)
  async onSelectCell(
    @ConnectedSocket() { user }: AuthenticatedSocket,
    @MessageBody() cellIndex: number
  ): Promise<void> {
    const {
      room: { _id },
      username,
    } = user;
    const room = await this.roomService.getRoom(_id);
    const {
      nextTurn,
      oldIndex,
      remaining,
      winner,
    } = await this.gameService.selectCellByUser(room, cellIndex, username);
    if (!remaining) {
      const message: CellSelectedEnvelope = {
        newIndex: cellIndex,
        oldIndex,
        username,
      };
      this.socketService.emitToRoom(room, GameEvent.CellSelected, message);
    } else {
      const message: CellRevealedEnvelope = {
        cellIndex,
        nextTurn,
        remaining,
      };
      this.socketService.emitToRoom(room, GameEvent.CellRevealed, message);
      if (winner) {
        this.socketService.emitToRoom(room, GameEvent.GameWon, winner);
      }
    }
  }
}
