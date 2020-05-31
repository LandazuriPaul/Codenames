import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { JoinRoomMessage, SocketEvent } from '@codenames/domain';

import { SocketService } from '~/modules/socket/socket.service';

@WebSocketGateway({ serveClient: false })
export class RoomGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  public server: Server;

  private logger = new Logger(RoomGateway.name);

  constructor(private readonly socketService: SocketService) {}

  afterInit(server: Server): void {
    this.socketService.server = server;
  }

  async handleConnection(): Promise<void> {
    this.logger.log('1 new connection');
  }

  async handleDisconnect(@ConnectedSocket() client: Socket): Promise<void> {
    this.logger.log(`${client.id} disconnected`);
  }

  @SubscribeMessage(SocketEvent.JoinRoom)
  async onJoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { roomId }: JoinRoomMessage
  ): Promise<void> {
    // TODO
    this.socketService.allocateSocketToRoom(socket, roomId);
    socket.emit(SocketEvent.RoomJoined, {
      socketId: socket.client.id,
      roomId: roomId,
    });
  }
}
