import { configure } from 'mobx';
import { create } from 'mobx-persist';

import { GameStore } from './game.store';

const hydrate = create();

export class RootStore {
  private static instance: RootStore;
  public gameStore: GameStore;

  private constructor() {
    // global mobX settings
    configure({
      enforceActions: 'always',
    });

    // initialise each store
    this.gameStore = new GameStore(this);
  }

  static async instantiate() {
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
