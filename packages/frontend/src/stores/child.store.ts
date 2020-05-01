import { RootStore } from './root.store';

export abstract class ChildStore {
  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
}
