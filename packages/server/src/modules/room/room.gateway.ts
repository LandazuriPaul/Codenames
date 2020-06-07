import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { JoinRoomEnvelope, RoomEvent } from '@codenames/domain';

import { RoomService } from './room.service';

@WebSocketGateway({ serveClient: false })
export class RoomGateway {
  @WebSocketServer()
  private server: Server;
  private logger = new Logger(RoomGateway.name);

  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage(RoomEvent.JoinRoom)
  async onJoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { roomId, username }: JoinRoomEnvelope
  ): Promise<void> {
    const userHash = this.roomService.pushSocketToUser(
      socket,
      roomId,
      username
    );
    const roomHash = this.roomService.pushSocketToRoom(socket, roomId);
    this.server.to(userHash).emit(RoomEvent.RoomJoined, roomId);
    this.server.to(roomHash).emit(RoomEvent.UserJoined, username);
  }
}
