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
    options.allowRequest = this.allowRequest.bind(this);
    const server: Server = super.createIOServer(port, options);

    server.use(this.attachUserToSocket.bind(this));

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

  private async attachUserToSocket(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket: any,
    next: (err?: Error) => void
  ): Promise<void> {
    const token = this.getRequestToken(socket.request);
    const authPayload = this.jwtService.verify<JwtPayload>(token);
    try {
      socket.user = await this.authenticationService.validatePayload(
        authPayload
      );
      next();
    } catch (err) {
      this.logger.error('An error occurred on payload validation');
      // eslint-disable-next-line no-console
      console.error(err);
      next(err);
    }
  }

  private allowRequest(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request: any,
    callback: (err: number, success: boolean) => void
  ): void {
    const token = this.getRequestToken(request);
    try {
      if (!token) {
        // CLOSE_PROTOCOL_ERROR: Endpoint received a malformed frame
        return callback(1002, false);
      }
      const authPayload = this.jwtService.verify<JwtPayload>(token);
      if (authPayload) {
        return callback(0, true);
      }
      return callback(4000, false);
    } catch (err) {
      this.logger.log(err);
      return callback(4000, false);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getRequestToken(request: any): string {
    return parse(extract(request.url))?.token as string;
  }
}
