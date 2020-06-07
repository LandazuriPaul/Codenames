import { Team } from '@codenames/domain';

export class RoomNotFound extends Error {
  constructor(roomId: string) {
    super(`Room ${roomId} not found`);
  }
}

export class TeamNotFound extends Error {
  constructor(roomId: string, team: Team) {
    super(`Team ${team} not found in room ${roomId}`);
  }
}

export class UserNotFound extends Error {
  constructor(roomId: string, username: string) {
    super(`User ${username} not found in room ${roomId}`);
  }
}
