import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import { Room } from 'socket.io';

import { JwtPayload, TokenPayload } from '@codenames/domain';

import { ConfigService } from '~/modules/config/config.service';
import { RoomService } from '~/modules/room/room.service';
import { SocketRoomHash } from '~/modules/socket/socketRoomHash.type';

@Injectable()
export class AuthenticationService {
  private jwtSignOptions: SignOptions;
  private logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly roomService: RoomService
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

  validatePayload(payload: JwtPayload): SocketRoomHash {
    try {
      return this.roomService.getUserInRoom(payload.roomId, payload.username);
    } catch {
      this.logger.log(`Invalid user payload: ${JSON.stringify(payload)}`);
      throw new ForbiddenException();
    }
  }
}
