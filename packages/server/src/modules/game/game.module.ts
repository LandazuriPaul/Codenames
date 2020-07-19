import { Module } from '@nestjs/common';

import { RoomModule } from '~/modules/room/room.module';

import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Room } from '~/modules/room/room.entity';

@Module({
  imports: [RoomModule, TypeOrmModule.forFeature([Room])],
  providers: [GameGateway, GameService],
})
export class GameModule {}
