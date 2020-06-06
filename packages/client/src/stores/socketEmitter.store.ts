import { SocketNamespace } from '@codenames/domain';

import { ChildStore } from './child.store';
import { RootStore } from './root.store';

export abstract class SocketEmitterStore extends ChildStore {
  static namespace: SocketNamespace;

  constructor(rootStore: RootStore) {
    super(rootStore);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: string, ...args: any[]): void {
    const namespace = (this.constructor as typeof SocketEmitterStore).namespace;
    const socket = this.rootStore.websocketStore.getSocket(namespace);
    socket.emit(event, ...args);
  }
}
