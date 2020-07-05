import { Logger, UseInterceptors } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import {
  GameEvent,
  GameSettings,
  NewGameEnvelope,
  Team,
  Teams,
} from '@codenames/domain';

import { RedisPropagatorInterceptor } from '~/modules/shared/redisPropagator/redisPropagator.interceptor';
import { AuthenticatedSocket } from '~/modules/shared/socket/authenticatedSocket.interface';
import { SocketService } from '~/modules/shared/socket/socket.service';
import { Game, Timer } from '~/modules/room/game.entity';
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
    @ConnectedSocket() { user: { room } }: AuthenticatedSocket,
    @MessageBody() settings: GameSettings
  ): Promise<void> {
    const board = this.gameService.generateBoard(settings.board);
    const timer = new Timer(settings.timer.guess, settings.timer.hint);
    const game = new Game(board, timer);
    this.roomService.initRoomGame(room, game, settings.teams);

    const teams: Teams = {
      [Team.A]: {
        players: Array.from(room.teams[Team.A].players),
        spyMaster: room.teams[Team.A].spyMaster,
      },
      [Team.B]: {
        players: Array.from(room.teams[Team.B].players),
        spyMaster: room.teams[Team.B].spyMaster,
      },
      [Team.Observer]: {
        players: Array.from(room.teams[Team.Observer].players),
      },
    };

    const newGame: NewGameEnvelope = {
      board,
      timer,
      teams,
    };
    this.socketService.emitToRoom(room, GameEvent.GameReady, newGame);
  }
}
