import { Injectable, Logger } from '@nestjs/common';
import { Room, Server, Socket } from 'socket.io';

import { ConfigService } from '~/config/config.service';

@Injectable()
export class RoomService {
  private logger: Logger;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger(RoomService.name);
  }

  allocateSocketToRoom(socket: Socket, roomId: string): Socket {
    socket.join(roomId);
    return socket;
  }

  getRoomInServer(server: Server, roomId: string): Room {
    return server.sockets.adapter.rooms[roomId];
  }
}
