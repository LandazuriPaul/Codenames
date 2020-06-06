import { Logger } from '@nestjs/common';
import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { SocketService } from '~/modules/socket/socket.service';

@WebSocketGateway({ serveClient: false })
export class SocketGateway implements OnGatewayInit {
  private logger = new Logger(SocketGateway.name);

  constructor(private readonly socketService: SocketService) {}

  afterInit(server: Server): void {
    this.socketService.server = server;
    this.logger.log('WS server listening');
  }
}
