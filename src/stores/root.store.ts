import { configure } from 'mobx';
import { create } from 'mobx-persist';

import { GameStore } from './game.store';
import { UiStore } from './ui.store';

const hydrate = create();

export class RootStore {
  private static instance: RootStore;
  public gameStore: GameStore;
  public uiStore: UiStore;

  private constructor() {
    // global mobX settings
    configure({
      enforceActions: 'always',
    });

    // initialise each store
    this.gameStore = new GameStore(this);
    this.uiStore = new UiStore(this);
  }

  static async instantiate(): Promise<RootStore> {
    if (RootStore.instance) {
      return RootStore.instance;
    }

    const rootStore = new RootStore();

    // specify which stores need to be persisted into the localstorage
    await hydrate(GameStore.LOCALSTORAGE_KEY, rootStore.gameStore);

    // singleton instance
    RootStore.instance = rootStore;
    return rootStore;
  }
}
