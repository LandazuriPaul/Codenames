import { Global, Module, forwardRef } from '@nestjs/common';

import { AuthenticationModule } from '~/modules/authentication/authentication.module';
import { SocketModule } from '~/modules/socket/socket.module';

import { RoomController } from './room.controller';
import { RoomGateway } from './room.gateway';
import { RoomService } from './room.service';

@Global()
@Module({
  imports: [forwardRef(() => AuthenticationModule), SocketModule],
  controllers: [RoomController],
  providers: [RoomGateway, RoomService],
  exports: [RoomService],
})
export class RoomModule {}
