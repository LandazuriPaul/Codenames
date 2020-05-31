import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '@codenames/domain';

import { ConfigService } from '~/modules/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.secretJwtKey,
      passReqToCallback: true,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
  // async validate(req: Request, payload: JwtPayload, done: any): Promise<Room> {
  //   const userRoom = this.authenticationService.validatePayload(payload);
  //   if (!userRoom) {
  //     return done(null, false, { message: 'invalid token' });
  //   }
  //   return done(null, userRoom);
  // }
}
