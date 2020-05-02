import { Module } from '@nestjs/common';

import { ConfigModule } from '~/config/config.module';

import { AppModule } from './app/app.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [AppModule, ConfigModule, EventsModule],
})
export class APIModule {}
