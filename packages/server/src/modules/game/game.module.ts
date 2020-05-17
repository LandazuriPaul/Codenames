import { Module } from '@nestjs/common';

import { RoomModule } from '~/modules/room/room.module';
import { RoomService } from '~/modules/room/room.service';

import { GameGateway } from './game.gateway';

@Module({
  imports: [RoomModule],
  providers: [GameGateway, RoomService],
})
export class GameModule {}
