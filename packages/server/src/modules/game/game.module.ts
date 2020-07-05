import { Module } from '@nestjs/common';

import { RoomModule } from '~/modules/room/room.module';

import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
  imports: [RoomModule],
  providers: [GameGateway, GameService],
})
export class GameModule {}
