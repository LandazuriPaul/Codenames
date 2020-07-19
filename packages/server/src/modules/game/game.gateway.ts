import { Logger, UseInterceptors } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import {
  CellSelectedEnvelope,
  GameEvent,
  GameReadyEnvelope,
  GameSettings,
  Teams,
} from '@codenames/domain';

import { RedisPropagatorInterceptor } from '~/modules/shared/redisPropagator/redisPropagator.interceptor';
import { AuthenticatedSocket } from '~/modules/shared/socket/authenticatedSocket.interface';
import { SocketService } from '~/modules/shared/socket/socket.service';
import { Game, Timer } from '~/modules/game/game.entity';
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
    await this.gameService.selectCellByUser(room, cellIndex, username);
    const message: CellSelectedEnvelope = { cellIndex, username };
    this.socketService.emitToRoom(room, GameEvent.CellSelected, message);
  }
}
