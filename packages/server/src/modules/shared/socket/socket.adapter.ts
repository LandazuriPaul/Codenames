import {
  INestApplicationContext,
  Logger,
  WebSocketAdapter,
} from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { JwtService } from '@nestjs/jwt';
import { Server, ServerOptions } from 'socket.io';
import { extract, parse } from 'query-string';

import { JwtPayload } from '@codenames/domain';

import { AuthenticationService } from '~/modules/shared/authentication/authentication.service';
import { RedisPropagatorService } from '~/modules/shared/redisPropagator/redisPropagator.service';

import { SocketService } from './socket.service';
import { AuthenticatedSocket } from './authenticatedSocket.interface';

export class SocketAdapter extends IoAdapter implements WebSocketAdapter {
  private logger = new Logger(SocketAdapter.name);

  constructor(
    app: INestApplicationContext,
    private readonly socketService: SocketService,
    private readonly redisPropagatorService: RedisPropagatorService,
    private readonly jwtService: JwtService,
    private readonly authenticationService: AuthenticationService
  ) {
    super(app);
  }

  create(port: number, options: ServerOptions = {}): Server {
    const server: Server = super.createIOServer(port, options);

    server.use(this.allowRequest.bind(this));
    this.redisPropagatorService.injectSocketServer(server);

    return server;
  }

  bindClientConnect(server: Server, callback: Function): void {
    server.on('connection', (socket: AuthenticatedSocket) => {
      if (socket.user) {
        this.socketService.addSocketToUser(socket.user, socket);

        socket.on('disconnect', () => {
          this.socketService.removeSocketFromUser(socket.user, socket);

          socket.removeAllListeners('disconnect');
        });
      }

      callback(socket);
    });
  }

  private async allowRequest(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket: any,
    next: (err?: Error) => void
  ): Promise<void> {
    const token = parse(extract(socket.request.url))?.token as string;
    try {
      if (!token) {
        return next(new Error('No token found'));
      }
      const authPayload = this.jwtService.verify<JwtPayload>(token);
      if (authPayload) {
        socket.user = await this.authenticationService.validatePayload(
          authPayload
        );
        return next();
      }
      return next(new Error('Invalid token'));
    } catch (err) {
      this.logger.log(err);
      return next(new Error('Invalid token'));
    }
  }
}
