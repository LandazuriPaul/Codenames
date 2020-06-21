import dayjs from 'dayjs';
import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import {
  ChatEvent,
  GeneralChatEnvelope,
  Team,
  TeamChatEnvelope,
} from '@codenames/domain';

import { RoomService } from '~/modules/room/room.service';

@WebSocketGateway({ serveClient: false })
export class ChatGateway {
  private logger = new Logger(ChatGateway.name);

  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage(ChatEvent.GeneralMessage)
  async onGeneralMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { message, roomId }: { message: string; roomId: string }
  ): Promise<void> {
    const envelope: GeneralChatEnvelope = {
      team: Team.A,
      text: message,
      timestamp: dayjs().valueOf(),
      username: 'Frodo',
    };
    const room = this.roomService.getRoom(roomId);
    // socket.server.to(room).emit(ChatEvent.GeneralMessage, envelope);
  }

  @SubscribeMessage(ChatEvent.TeamMessage)
  async onTeamMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { message, roomId }: { message: string; roomId: string }
  ): Promise<void> {
    const envelope: TeamChatEnvelope = {
      text: message,
      timestamp: dayjs().valueOf(),
      username: 'Gandalf',
    };
    const room = this.roomService.getRoom(roomId);
    // socket.server.to(room).emit(ChatEvent.TeamMessage, envelope);
  }
}
