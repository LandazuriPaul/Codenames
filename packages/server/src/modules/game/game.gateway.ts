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

import { SocketEvent, SocketNamespace } from '@codenames/domain';

import { RoomService } from '~/modules/room/room.service';

@WebSocketGateway({ namespace: SocketNamespace.GAME, serveClient: false })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger;

  constructor(private readonly roomService: RoomService) {
    this.logger = new Logger(GameGateway.name);
  }

  async handleConnection(): Promise<void> {
    this.logger.log('1 new connection');
  }

  async handleDisconnect(@ConnectedSocket() client: Socket): Promise<void> {
    this.logger.log(`${client.id} disconnected`);
  }

  @SubscribeMessage(SocketEvent.JOIN_ROOM)
  async onJoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() roomId: string
  ): Promise<void> {
    this.roomService.allocateSocketToRoom(socket, roomId);
    const roomSize = this.roomService.getRoomInServer(this.server, roomId)
      .length;
    socket.emit(SocketEvent.ROOM_JOINED, {
      socketId: socket.client.id,
      roomId: roomId,
      roomSize,
    });
    socket.to(roomId).emit('userList', roomSize);
  }
}
