import { Module } from '@nestjs/common';

import { RedisService } from './redis.service';
import { redisProviders } from './redis.providers';

@Module({
  providers: [...redisProviders, RedisService],
  exports: [...redisProviders, RedisService],
})
export class RedisModule {}
