import { Dispatch, SetStateAction, createContext } from 'react';

import { GameSettings, ValueOf } from '@codenames/domain';

interface GameSettingsContext {
  activeTab: 0 | 1 | 2;
  setActiveTab: Dispatch<SetStateAction<0 | 1 | 2>>;
  setSetting: (
    setting: keyof GameSettings,
    value: ValueOf<GameSettings>
  ) => void;
  settings: GameSettings;
}

export const gameSettingsContext = createContext<GameSettingsContext>(null);
