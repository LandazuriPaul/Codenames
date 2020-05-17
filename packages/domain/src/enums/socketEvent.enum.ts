export enum SocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  EVENT = 'event',
  EXCEPTION = 'exception',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  ROOM_JOINED = 'roomJoined',
  ROOM_LEFT = 'roomLeft',
  USER_JOINED = 'userJoined',
  USER_LEFT = 'userLeft',
}
