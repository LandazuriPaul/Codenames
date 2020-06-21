import { Socket } from 'socket.io';

import { User } from '~/modules/user/user.class';

export interface AuthenticatedSocket extends Socket {
  user: User;
}
