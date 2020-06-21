export class UserNotFound extends Error {
  constructor(roomId: string, username: string) {
    super(`User ${username} not found in room ${roomId}`);
  }
}
