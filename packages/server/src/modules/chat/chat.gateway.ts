import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { ChatEvent, SocketNamespace } from '@codenames/domain';

import { SocketService } from '~/modules/socket/socket.service';

@WebSocketGateway({ namespace: SocketNamespace.Chat, serveClient: false })
export class ChatGateway {
  private logger = new Logger(ChatGateway.name);

  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage(ChatEvent.Message)
  async onMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: string
  ): Promise<void> {
    this.logger.log(`client: ${socket.client.id}`);
    this.logger.log(message);
    // TODO
    socket.broadcast.emit(ChatEvent.Message, message);
  }
}
