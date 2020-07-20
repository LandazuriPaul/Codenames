import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Room } from '~/entities';
import { RoomModule } from '~/modules/room/room.module';

import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
  imports: [RoomModule, TypeOrmModule.forFeature([Room])],
  providers: [GameGateway, GameService],
})
export class GameModule {}
