import { INestApplicationContext, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { extract, parse } from 'query-string';

export class AuthenticatedSocketIoAdapter extends IoAdapter {
  private readonly jwtService: JwtService;
  private logger = new Logger(AuthenticatedSocketIoAdapter.name);

  constructor(private app: INestApplicationContext) {
    super(app);
    this.jwtService = this.app.get(JwtService);
  }

  createIOServer(port: number, options: ServerOptions): any {
    options.allowRequest = async (request, allowFunction) => {
      const token = parse(extract(request.url))?.token as string;
      try {
        if (!token) {
          // CLOSE_PROTOCOL_ERROR: Endpoint received a malformed frame
          return allowFunction(1002, false);
        }
        const verified = await this.jwtService.verify(token);
        if (verified) {
          return allowFunction(0, true);
        }
        return allowFunction(4000, false);
      } catch (err) {
        this.logger.log(err);
        return allowFunction(4000, false);
      }
    };

    return super.createIOServer(port, options);
  }
}
