import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '~/modules/shared/config/config.module';
import { ConfigService } from '~/modules/shared/config/config.service';

import { MongodbConfig } from './mongodb.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: 'default',
      useFactory: MongodbConfig.getConfig,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
