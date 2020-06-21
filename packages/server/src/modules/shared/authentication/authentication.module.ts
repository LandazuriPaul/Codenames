import { Module, forwardRef } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import { ConfigModule } from '~/modules/shared/config/config.module';
import { ConfigService } from '~/modules/shared/config/config.service';
import { UserModule } from '~/modules/user/user.module';

import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService
      ): Promise<JwtModuleOptions> => ({
        secret: configService.secretJwtKey,
        signOptions: { expiresIn: configService.jwtExpiresIn },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthenticationService, JwtStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
