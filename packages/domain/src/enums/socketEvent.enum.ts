export enum SocketEvent {
  Connect = 'connect',
  ConnectError = 'connect_error',
  Disconnect = 'disconnect',
  Event = 'event',
  Exception = 'exception',
  JoinRoom = 'joinRoom',
  LeaveRoom = 'leaveRoom',
  RoomJoined = 'roomJoined',
  RoomLeft = 'roomLeft',
  UserJoined = 'userJoined',
  UserLeft = 'userLeft',
}
