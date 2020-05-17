import { Module } from '@nestjs/common';

import { ConfigModule } from '~/config/config.module';

import { ChatModule } from './chat/chat.module';
import { GameModule } from './game/game.module';
import { HelloModule } from './hello/hello.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [ConfigModule, ChatModule, GameModule, HelloModule, RoomModule],
})
export class APIModule {}
