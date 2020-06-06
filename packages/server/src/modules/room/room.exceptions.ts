export class RoomNotFound extends Error {
  constructor(message = 'Room not found') {
    super(message);
  }
}

export class TeamNotFound extends Error {
  constructor(message = 'team not found') {
    super(message);
  }
}

export class UserNotFound extends Error {
  constructor(message = 'user not found') {
    super(message);
  }
}
