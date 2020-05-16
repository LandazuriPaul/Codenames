export function cleanRoomIdFromInput(input: string): string {
  return input.replace(/[^a-zA-Z]/g, '').toUpperCase();
}
