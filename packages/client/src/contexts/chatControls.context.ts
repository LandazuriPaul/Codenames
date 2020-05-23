import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
} from 'react';
import { TeamColor } from '@codenames/domain';

interface ChatControlsContext {
  activeTab: 0 | 1;
  globalChatRef: MutableRefObject<HTMLDivElement>;
  setActiveTab: Dispatch<SetStateAction<0 | 1>>;
  teamChatRef: MutableRefObject<HTMLDivElement>;
  userColor: TeamColor;
}

export const chatControlsContext = createContext<ChatControlsContext>(null);
