import { Injectable } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { Server } from 'socket.io';

import { RedisService } from '~/modules/shared/redis/redis.service';
import { SocketService } from '~/modules/shared/socket/socket.service';

import { RedisSocketEventEmitDTO } from './dto/redisSocketEventEmit.dto';
import { RedisSocketEventSendDTO } from './dto/redisSocketEventSend.dto';
import {
  REDIS_SOCKET_EVENT_EMIT_ALL_NAME,
  REDIS_SOCKET_EVENT_EMIT_AUTHENTICATED_NAME,
  REDIS_SOCKET_EVENT_SEND_NAME,
} from './redisPropagator.constants';

@Injectable()
export class RedisPropagatorService {
  private socketServer: Server;

  constructor(
    private readonly socketService: SocketService,
    private readonly redisService: RedisService
  ) {
    this.redisService
      .fromEvent(REDIS_SOCKET_EVENT_SEND_NAME)
      .pipe(tap(this.consumeSendEvent))
      .subscribe();

    this.redisService
      .fromEvent(REDIS_SOCKET_EVENT_EMIT_ALL_NAME)
      .pipe(tap(this.consumeEmitToAllEvent))
      .subscribe();
  }

  injectSocketServer(server: Server): RedisPropagatorService {
    this.socketServer = server;

    return this;
  }

  propagateEvent(eventInfo: RedisSocketEventSendDTO): boolean {
    if (!eventInfo.user) {
      return false;
    }

    this.redisService.publish(REDIS_SOCKET_EVENT_SEND_NAME, eventInfo);

    return true;
  }

  emitToAuthenticated(eventInfo: RedisSocketEventEmitDTO): boolean {
    this.redisService.publish(
      REDIS_SOCKET_EVENT_EMIT_AUTHENTICATED_NAME,
      eventInfo
    );

    return true;
  }

  emitToAll(eventInfo: RedisSocketEventEmitDTO): boolean {
    this.redisService.publish(REDIS_SOCKET_EVENT_EMIT_ALL_NAME, eventInfo);

    return true;
  }

  private consumeSendEvent = (eventInfo: RedisSocketEventSendDTO): void => {
    const { user, event, data, socketId } = eventInfo;

    return this.socketService
      .getUserSockets(user)
      .filter(socket => socket.id !== socketId)
      .forEach(socket => socket.emit(event, data));
  };

  private consumeEmitToAllEvent = (
    eventInfo: RedisSocketEventEmitDTO
  ): void => {
    this.socketServer.emit(eventInfo.event, eventInfo.data);
  };
}
