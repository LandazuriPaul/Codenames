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

import { SocketEvent } from '@codenames/domain';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  users = 0;

  async handleConnection(): Promise<void> {
    // A client has connected
    this.users++;

    Logger.log(`new connection - # users: ${this.users}`);

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  async handleDisconnect(): Promise<void> {
    // A client has disconnected
    this.users--;

    Logger.log(`1 closed connection - # users: ${this.users}`);

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('chat')
  async onChat(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    Logger.log(message);

    client.broadcast.emit(SocketEvent.EVENT, {
      message,
      timestamp: new Date(),
      id: '123',
    });
  }
}
