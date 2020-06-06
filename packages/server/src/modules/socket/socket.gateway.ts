import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { SocketNamespace } from '@codenames/domain';

import { SocketService } from '~/modules/socket/socket.service';

@WebSocketGateway({ namespace: SocketNamespace.Default, serveClient: false })
export class SocketGateway implements OnGatewayInit {
  @WebSocketServer()
  public server: Server;
  private logger = new Logger(SocketGateway.name);

  constructor(private readonly socketService: SocketService) {}

  afterInit(server: Server): void {
    this.logger.log('WS server initialised');
    this.socketService.server = server;
  }
}
