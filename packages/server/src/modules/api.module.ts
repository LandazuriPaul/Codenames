import { Module } from '@nestjs/common';

import { ConfigModule } from '~/config/config.module';

import { AppModule } from './app/app.module';
import { ChatModule } from './chat/chat.module';
import { HelloModule } from './hello/hello.module';

@Module({
  imports: [AppModule, ConfigModule, ChatModule, HelloModule],
})
export class APIModule {}
