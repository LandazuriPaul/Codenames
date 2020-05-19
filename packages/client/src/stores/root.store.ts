import { configure } from 'mobx';
import { create } from 'mobx-persist';

import { ChatStore } from './chat.store';
import { GameStore } from './game.store';
import { UiStore } from './ui.store';
import { WebsocketStore } from './websocket.store';

const hydrate = create();

export class RootStore {
  private static instance: RootStore;

  public chatStore: ChatStore;
  public gameStore: GameStore;
  public uiStore: UiStore;
  public websocketStore: WebsocketStore;

  private constructor() {
    // global mobX settings
    configure({
      enforceActions: 'always',
    });

    // initialise each store
    this.chatStore = new ChatStore(this);
    this.gameStore = new GameStore(this);
    this.uiStore = new UiStore(this);
    this.websocketStore = new WebsocketStore(this);
  }

  static async instantiate(): Promise<RootStore> {
    if (RootStore.instance) {
      return RootStore.instance;
    }

    const rootStore = new RootStore();

    // specify which stores need to be persisted into the localstorage
    await hydrate(
      `codenames_${GameStore.LOCALSTORAGE_KEY}`,
      rootStore.gameStore
    );
    await hydrate(`codenames_${UiStore.LOCALSTORAGE_KEY}`, rootStore.uiStore);

    // singleton instance
    RootStore.instance = rootStore;
    return rootStore;
  }
}
