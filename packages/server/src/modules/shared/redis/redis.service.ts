import { Inject, Injectable } from '@nestjs/common';
import { Observable, Observer } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Redis as RedisClient } from 'ioredis';

import { RedisSocketEventSendDTO } from '~/modules/shared/redisPropagator/dto/redisSocketEventSend.dto';

import {
  REDIS_PUBLISHER_CLIENT,
  REDIS_SUBSCRIBER_CLIENT,
} from './redis.constants';

interface RedisSubscribeMessage {
  readonly message: string;
  readonly channel: string;
}

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_SUBSCRIBER_CLIENT)
    private readonly redisSubscriberClient: RedisClient,
    @Inject(REDIS_PUBLISHER_CLIENT)
    private readonly redisPublisherClient: RedisClient
  ) {}

  fromEvent<T extends RedisSocketEventSendDTO>(
    eventName: string
  ): Observable<T> {
    this.redisSubscriberClient.subscribe(eventName);

    return Observable.create((observer: Observer<RedisSubscribeMessage>) =>
      this.redisSubscriberClient.on('message', (channel, message) =>
        observer.next({ channel, message })
      )
    ).pipe(
      filter(({ channel }) => channel === eventName),
      // FIXME
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      map(({ message }) => JSON.parse(message))
    );
  }

  async publish(channel: string, value: unknown): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      return this.redisPublisherClient.publish(
        channel,
        JSON.stringify(value),
        (error, reply) => {
          if (error) {
            return reject(error);
          }

          return resolve(reply);
        }
      );
    });
  }
}
