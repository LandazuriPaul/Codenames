import { Module, forwardRef } from '@nestjs/common';

import { RoomModule } from '~/modules/room/room.module';

import { UserService } from './user.service';

@Module({
  imports: [forwardRef(() => RoomModule)],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
