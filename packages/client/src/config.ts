import { AvailableLanguages, GameSettings } from '@codenames/domain';

import { getApiUrl } from '~/utils/getApiUrl';

export const API_URL = getApiUrl();
export const APP_ROOT = 'root';
export const DEFAULT_GAME_SETTINGS: GameSettings = {
  boardDimensions: { height: 5, width: 5 },
  language: AvailableLanguages.English,
  rudeRatio: 0,
  teams: {
    a: [],
    b: [],
    spyA: '',
    spyB: '',
  },
};
export const LOGGER_PREFIX = 'codenames';
export const MASTER_VIEW_DIMMING_COEFFICIENT = 0.6;
