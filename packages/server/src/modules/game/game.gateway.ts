import { Logger, UseInterceptors } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import { GameEvent, GameSettings, NewGameEnvelope } from '@codenames/domain';

import { RedisPropagatorInterceptor } from '~/modules/shared/redisPropagator/redisPropagator.interceptor';
import { AuthenticatedSocket } from '~/modules/shared/socket/authenticatedSocket.interface';

import { GameService } from './game.service';

@UseInterceptors(RedisPropagatorInterceptor)
@WebSocketGateway({ serveClient: false })
export class GameGateway {
  private logger = new Logger(GameGateway.name);

  constructor(private readonly gameService: GameService) {}

  @SubscribeMessage(GameEvent.GenerateGame)
  async onGeneralMessage(
    @ConnectedSocket() socket: AuthenticatedSocket,
    @MessageBody() settings: GameSettings
  ): Promise<void> {
    const board = this.gameService.generateBoard(settings.board);
    const newGame: NewGameEnvelope = {
      board,
      boardHeight: settings.board.height,
      boardWidth: settings.board.width,
    };
    socket.emit(GameEvent.GameReady, newGame);
  }
}
