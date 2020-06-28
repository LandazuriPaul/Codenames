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
import { SocketService } from '~/modules/shared/socket/socket.service';
import { RedisPropagatorInterceptor } from '~/modules/shared/redisPropagator/redisPropagator.interceptor';

import { RoomService } from './room.service';

@UseInterceptors(RedisPropagatorInterceptor)
@WebSocketGateway({ serveClient: false })
export class RoomGateway {
  @WebSocketServer()
  private server: Server;
  private logger = new Logger(RoomGateway.name);

  constructor(
    private readonly roomService: RoomService,
    private readonly socketService: SocketService
  ) {}

  @SubscribeMessage(RoomEvent.JoinRoom)
  async onJoinRoom(
    @ConnectedSocket() socket: AuthenticatedSocket
  ): Promise<void> {
    const { user } = socket;
    const { isHost, room, username } = user;
    if (!room.usernames.has(username)) {
      this.roomService.addUserToRoom(room._id, username);
    }
    const userSockets = this.socketService.getUserSockets(user);
    this.socketService.emitToRoom(
      room,
      RoomEvent.UserJoined,
      username,
      userSockets
    );
    socket.emit(RoomEvent.RoomJoined, {
      roomId: room._id,
      isHost,
      usernames: Array.from(room.usernames),
    });
  }

  @SubscribeMessage(RoomEvent.LeaveRoom)
  async onLeaveRoom(
    @ConnectedSocket() { user }: AuthenticatedSocket
  ): Promise<void> {
    const userSockets = this.socketService.getUserSockets(user);
    this.socketService.emitToRoom(
      user.room,
      RoomEvent.UserLeft,
      user.username,
      userSockets
    );
    this.socketService.emitToUser(user, RoomEvent.RoomLeft);
  }
}
