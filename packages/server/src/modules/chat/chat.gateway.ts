import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ChatEvent, SocketEvent, SocketNamespace } from '@codenames/domain';

@WebSocketGateway({ namespace: SocketNamespace.Chat, serveClient: false })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  roomList = [];

  private logger: Logger;

  constructor() {
    this.logger = new Logger(ChatGateway.name);
  }

  async handleConnection(): Promise<void> {
    this.logger.log('1 new connection');
  }

  async handleDisconnect(): Promise<void> {
    this.logger.log('1 connection closed');
  }

  @SubscribeMessage(ChatEvent.Message)
  async onMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: string
  ): Promise<void> {
    this.logger.log(message);

    client.broadcast.emit(SocketEvent.Event, {
      message,
      timestamp: new Date(),
      id: '123',
    });
  }
}
