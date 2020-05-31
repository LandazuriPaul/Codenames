import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import { Room } from 'socket.io';

import { JwtPayload, TokenPayload } from '@codenames/domain';

import { ConfigService } from '~/modules/config/config.service';
import { SocketService } from '~/modules/socket/socket.service';

@Injectable()
export class AuthenticationService {
  private jwtSignOptions: SignOptions;
  private logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly socketService: SocketService
  ) {
    this.jwtSignOptions = {
      expiresIn: configService.jwtExpiresIn,
    };
  }

  createAccessToken(payload: JwtPayload): TokenPayload {
    const signedPayload = this.jwtService.sign(payload, this.jwtSignOptions);
    const token: TokenPayload = {
      accessToken: signedPayload,
      expiresIn: this.jwtSignOptions.expiresIn,
      tokenType: 'bearer',
    };
    return token;
  }

  validatePayload(payload: JwtPayload): Room {
    if (payload.username && payload.roomId) {
      const userRoom = this.socketService.getUserInRoom(
        payload.roomId,
        payload.username
      );
      if (!userRoom) {
        throw new ForbiddenException();
      }
      return userRoom;
    }
    this.logger.log(`Invalid user payload: ${JSON.stringify(payload)}`);
    throw new ForbiddenException();
  }
}
