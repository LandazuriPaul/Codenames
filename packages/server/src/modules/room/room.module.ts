import { Module } from '@nestjs/common';

import { AuthenticationModule } from '~/modules/authentication/authentication.module';

import { RoomController } from './room.controller';
import { RoomGateway } from './room.gateway';

@Module({
  imports: [AuthenticationModule],
  controllers: [RoomController],
  providers: [RoomGateway],
})
export class RoomModule {}
