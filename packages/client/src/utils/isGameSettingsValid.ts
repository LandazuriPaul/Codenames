import { GameSettings } from '@codenames/domain';

export function isGameSettingsValid(settings: GameSettings): boolean {
  return (
    settings.teams.a.length > 0 &&
    settings.teams.b.length > 0 &&
    settings.teams.spyA !== '' &&
    settings.teams.spyB !== ''
  );
}
