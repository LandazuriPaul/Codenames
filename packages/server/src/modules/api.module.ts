import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ChatModule } from './chat/chat.module';
import { HelloModule } from './hello/hello.module';
import { RoomModule } from './room/room.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, DatabaseModule, HelloModule, ChatModule, RoomModule],
})
export class APIModule {}
