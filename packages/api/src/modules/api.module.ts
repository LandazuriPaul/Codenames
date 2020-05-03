import { Module } from '@nestjs/common';

import { ConfigModule } from '~/config/config.module';

import { AppModule } from './app/app.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AppModule, ConfigModule, ChatModule],
})
export class APIModule {}
