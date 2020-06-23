import { Logger, UseInterceptors } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { RoomEvent } from '@codenames/domain';

import { AuthenticatedSocket } from '~/modules/shared/socket/authenticatedSocket.interface';
import { RedisPropagatorInterceptor } from '~/modules/shared/redisPropagator/redisPropagator.interceptor';

import { RoomService } from './room.service';

@UseInterceptors(RedisPropagatorInterceptor)
@WebSocketGateway({ serveClient: false })
export class RoomGateway {
  @WebSocketServer()
  private server: Server;
  private logger = new Logger(RoomGateway.name);

  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage(RoomEvent.JoinRoom)
  async onJoinRoom(
    @ConnectedSocket() socket: AuthenticatedSocket
  ): Promise<void> {
    this.logger.log('user joining');
    this.logger.log(`joining user: ${JSON.stringify(socket.user)}`);
    // this.server.to(userHash).emit(RoomEvent.RoomJoined, roomId);
    // this.server.to(roomHash).emit(RoomEvent.UserJoined, username);
  }

  @SubscribeMessage(RoomEvent.LeaveRoom)
  async onLeaveRoom(
    @ConnectedSocket() socket: AuthenticatedSocket
  ): Promise<void> {
    this.logger.log('user leaving');
    this.logger.log(`leaving user: ${JSON.stringify(socket.user)}`);
    // this.server.to(userHash).emit(RoomEvent.RoomJoined, roomId);
    // this.server.to(roomHash).emit(RoomEvent.UserJoined, username);
  }
}
