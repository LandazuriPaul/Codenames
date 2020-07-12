import { configure } from 'mobx';
import { create } from 'mobx-persist';

import { ChatStore } from './chat.store';
import { GameStore } from './game.store';
import { RoomStore } from './room.store';
import { WebsocketStore } from './websocket.store';

const hydrate = create();

export class RootStore {
  private static instance: RootStore;

  public chatStore: ChatStore;
  public gameStore: GameStore;
  public roomStore: RoomStore;
  public websocketStore: WebsocketStore;

  private constructor() {
    // global mobX settings
    configure({
      enforceActions: 'always',
    });

    // initialise each store
    this.chatStore = new ChatStore(this);
    this.gameStore = new GameStore(this);
    this.roomStore = new RoomStore(this);
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
    await hydrate(
      `codenames_${RoomStore.LOCALSTORAGE_KEY}`,
      rootStore.roomStore
    );
    await hydrate(
      `codenames_${WebsocketStore.LOCALSTORAGE_KEY}`,
      rootStore.websocketStore
    );

    // singleton instance
    RootStore.instance = rootStore;
    return rootStore;
  }
}
