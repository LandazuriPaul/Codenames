import { JwtPayload } from '@codenames/domain';

import { RedisSocketEventEmitDTO } from './redisSocketEventEmit.dto';

export class RedisSocketEventSendDTO extends RedisSocketEventEmitDTO {
  public readonly payload: JwtPayload;
  public readonly socketId: string;
}
