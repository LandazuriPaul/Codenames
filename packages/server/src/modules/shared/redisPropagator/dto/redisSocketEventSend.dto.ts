import { User } from '~/modules/user/user.class';

import { RedisSocketEventEmitDTO } from './redisSocketEventEmit.dto';

export class RedisSocketEventSendDTO extends RedisSocketEventEmitDTO {
  public readonly user: User;
  public readonly socketId: string;
}
