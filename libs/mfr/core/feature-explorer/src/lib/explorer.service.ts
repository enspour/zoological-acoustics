import { Injectable, signal } from '@angular/core';

import { ExplorerConfig, ExplorerRef } from './explorer.interface';

@Injectable()
export class ExplorerService {
  public instances = signal<ExplorerRef<unknown>[]>([]);

  public open<T>(config: ExplorerConfig<T>) {
    const instanceRef: ExplorerRef<T> = {
      id: '',
      config,
      close: () => this.close(instanceRef),
    };

    const index = this.instances().findIndex((i) => i.id === '');

    if (index !== -1) {
      this.instances.update((instances) => instances.with(index, instanceRef));
    } else {
      this.instances.update((instances) => [...instances, instanceRef]);
    }

    return instanceRef;
  }

  public close<T>(instanceRef: ExplorerRef<T>) {
    const index = this.instances().findIndex((i) => i === instanceRef);

    if (index === -1) {
      return;
    }

    this.instances.update((configs) => configs.toSpliced(index, 1));
  }
}
