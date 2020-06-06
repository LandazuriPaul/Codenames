export class SocketRoomNotFound extends Error {
  constructor(message = 'Socket room not found') {
    super(message);
  }
}
