import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '@codenames/domain';

import { ConfigService } from '~/modules/shared/config/config.service';
import { UserService } from '~/modules/user/user.service';
import { User } from '~/modules/user/user.class';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(JwtStrategy.name);

  constructor(
    configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.secretJwtKey,
      passReqToCallback: true,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return this.userService.getUser(payload.roomId, payload.username);
  }
}
