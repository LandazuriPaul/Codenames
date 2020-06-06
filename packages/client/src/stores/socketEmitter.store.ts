import { ChildStore } from './child.store';
import { RootStore } from './root.store';

export abstract class SocketEmitterStore extends ChildStore {
  constructor(rootStore: RootStore) {
    super(rootStore);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: string, ...args: any[]): void {
    this.rootStore.websocketStore.socket.emit(event, ...args);
  }
}
