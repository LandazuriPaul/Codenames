import { Socket } from 'socket.io';

import { JwtPayload } from '@codenames/domain';

export interface AuthenticatedSocket extends Socket {
  auth: JwtPayload;
}
