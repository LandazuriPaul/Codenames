import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';

import { JwtPayload, TokenPayload } from '@codenames/domain';

import { ConfigService } from '~/modules/shared/config/config.service';
import { User } from '~/modules/user/user.class';
import { UserService } from '~/modules/user/user.service';

@Injectable()
export class AuthenticationService {
  private jwtSignOptions: SignOptions;
  private logger = new Logger(AuthenticationService.name);

  constructor(
    configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
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

  async validatePayload(payload: JwtPayload): Promise<User> {
    try {
      return this.userService.getUser(payload.roomId, payload.username);
    } catch {
      this.logger.log(`Invalid user payload: ${JSON.stringify(payload)}`);
      throw new ForbiddenException();
    }
  }
}
