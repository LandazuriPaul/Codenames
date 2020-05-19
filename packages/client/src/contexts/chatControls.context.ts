import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
} from 'react';
import { UserColor } from '@codenames/domain';

interface ChatControlsContext {
  activeTab: 0 | 1;
  globalChatRef: MutableRefObject<HTMLDivElement>;
  setActiveTab: Dispatch<SetStateAction<0 | 1>>;
  teamChatRef: MutableRefObject<HTMLDivElement>;
  userColor: UserColor;
}

export const chatControlsContext = createContext<ChatControlsContext>(null);
