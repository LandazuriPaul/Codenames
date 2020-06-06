import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { JoinRoomMessage, RoomEvent, SocketNamespace } from '@codenames/domain';

import { SocketService } from '~/modules/socket/socket.service';

@WebSocketGateway({ namespace: SocketNamespace.Room, serveClient: false })
export class RoomGateway {
  private logger = new Logger(RoomGateway.name);

  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage(RoomEvent.JoinRoom)
  async onJoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { roomId }: JoinRoomMessage
  ): Promise<void> {
    this.logger.log(`client: ${socket.client.id}`);
    socket.emit(RoomEvent.RoomJoined, roomId);
    // TODO
  }
}
