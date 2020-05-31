import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { ChatModule } from './chat/chat.module';
import { HelloModule } from './hello/hello.module';
import { RoomModule } from './room/room.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [ConfigModule, ChatModule, HelloModule, RoomModule, SocketModule],
})
export class APIModule {}
