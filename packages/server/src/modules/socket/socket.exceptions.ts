export class SocketRoomNotFound extends Error {
  constructor(hash: string) {
    super(`Socket ${hash} room not found`);
  }
}
