import dayjs from 'dayjs';
import { Logger, UseInterceptors } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import {
  ChatEvent,
  GeneralChatEnvelope,
  Team,
  TeamChatEnvelope,
} from '@codenames/domain';

import { AuthenticatedSocket } from '~/modules/shared/socket/authenticatedSocket.interface';
import { RedisPropagatorInterceptor } from '~/modules/shared/redisPropagator/redisPropagator.interceptor';
import { SocketService } from '~/modules/shared/socket/socket.service';

import { RoomService } from '~/modules/room/room.service';

@UseInterceptors(RedisPropagatorInterceptor)
@WebSocketGateway({ serveClient: false })
export class ChatGateway {
  private logger = new Logger(ChatGateway.name);

  constructor(
    private readonly roomService: RoomService,
    private readonly socketService: SocketService
  ) {}

  @SubscribeMessage(ChatEvent.GeneralMessage)
  async onGeneralMessage(
    @ConnectedSocket() { user }: AuthenticatedSocket,
    @MessageBody() message: string
  ): Promise<void> {
    this.logger.log('general message');
    const envelope: GeneralChatEnvelope = {
      team: Team.A,
      text: message,
      timestamp: dayjs().valueOf(),
      username: user.username,
    };
    this.socketService.emitToRoom(
      user.room,
      ChatEvent.GeneralMessage,
      envelope
    );
  }

  @SubscribeMessage(ChatEvent.TeamMessage)
  async onTeamMessage(
    @ConnectedSocket() { user }: AuthenticatedSocket,
    @MessageBody() message: string
  ): Promise<void> {
    this.logger.log('team message');
    const envelope: TeamChatEnvelope = {
      text: message,
      timestamp: dayjs().valueOf(),
      username: user.username,
    };
    this.socketService.emitToRoom(user.room, ChatEvent.TeamMessage, envelope);
  }
}
