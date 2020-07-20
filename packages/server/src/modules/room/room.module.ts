import { Global, Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Room } from '~/entities';
import { AuthenticationModule } from '~/modules/shared/authentication/authentication.module';
import { UserModule } from '~/modules/user/user.module';

import { RoomController } from './room.controller';
import { RoomGateway } from './room.gateway';
import { RoomService } from './room.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    forwardRef(() => AuthenticationModule),
    UserModule,
  ],
  controllers: [RoomController],
  providers: [RoomGateway, RoomService],
  exports: [RoomService],
})
export class RoomModule {}
