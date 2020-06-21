import { Global, Module } from '@nestjs/common';

import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from './config/config.module';
import { RedisPropagatorModule } from './redisPropagator/redisPropagator.module';
import { RedisModule } from './redis/redis.module';
import { SocketModule } from './socket/socket.module';

@Global()
@Module({
  imports: [
    ConfigModule,
    AuthenticationModule,
    RedisModule,
    RedisPropagatorModule,
    SocketModule,
  ],
  exports: [
    ConfigModule,
    AuthenticationModule,
    RedisModule,
    RedisPropagatorModule,
    SocketModule,
  ],
})
export class SharedModule {}
