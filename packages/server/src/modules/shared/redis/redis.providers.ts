import { Provider } from '@nestjs/common';
import Redis, { Redis as RedisClient } from 'ioredis';

import { ConfigService } from '~/modules/shared/config/config.service';

import {
  REDIS_PUBLISHER_CLIENT,
  REDIS_SUBSCRIBER_CLIENT,
} from './redis.constants';

export const redisProviders: Provider[] = [
  {
    inject: [ConfigService],
    useFactory: (configService: ConfigService): RedisClient => {
      return new Redis({
        host: configService.secretRedisHost,
        password: configService.secretRedisPassword,
        port: configService.secretRedisPort,
      });
    },
    provide: REDIS_SUBSCRIBER_CLIENT,
  },
  {
    inject: [ConfigService],
    useFactory: (configService: ConfigService): RedisClient => {
      return new Redis({
        host: configService.secretRedisHost,
        password: configService.secretRedisPassword,
        port: configService.secretRedisPort,
      });
    },
    provide: REDIS_PUBLISHER_CLIENT,
  },
];
