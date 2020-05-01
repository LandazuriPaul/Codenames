import { action, observable } from 'mobx';

import { ChildStore } from './child.store';
import { RootStore } from './root.store';

export class UiStore extends ChildStore {
  @observable
  isInGame: boolean;

  @observable
  isPlaying: boolean;

  constructor(rootStore: RootStore) {
    super(rootStore);
    this.init();
  }

  @action
  init(): void {
    this.isInGame = false;
    this.isPlaying = false;
  }

  @action
  setIsInGame(isInGame: boolean): void {
    this.isInGame = isInGame;
  }
}
