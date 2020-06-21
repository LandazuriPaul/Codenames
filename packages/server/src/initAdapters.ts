import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthenticationService } from './modules/shared/authentication/authentication.service';
import { RedisPropagatorService } from '~/modules/shared/redisPropagator/redisPropagator.service';
import { SocketAdapter } from '~/modules/shared/socket/socket.adapter';
import { SocketService } from '~/modules/shared/socket/socket.service';

export const initAdapters = (app: INestApplication): INestApplication => {
  const socketService = app.get(SocketService);
  const redisPropagatorService = app.get(RedisPropagatorService);
  const jwtService = app.get(JwtService);
  const authenticationService = app.get(AuthenticationService);

  app.useWebSocketAdapter(
    new SocketAdapter(
      app,
      socketService,
      redisPropagatorService,
      jwtService,
      authenticationService
    )
  );

  return app;
};
