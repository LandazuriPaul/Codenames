import { GameSettings } from '@codenames/domain';

export function isGameSettingsValid(settings: GameSettings): boolean {
  return (
    settings.board.language &&
    settings.board.height > 2 &&
    settings.board.width > 2 &&
    settings.teams.a.length > 0 &&
    settings.teams.b.length > 0 &&
    settings.teams.spyA !== '' &&
    settings.teams.spyB !== ''
  );
}
