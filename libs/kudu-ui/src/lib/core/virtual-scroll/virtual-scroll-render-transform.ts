import { KuduVirtualScrollComponent } from './virtual-scroll.component';

import {
  KuduVirtualScrollRender,
  KuduVirtualScrollRenderStrategy,
} from './virtual-scroll.interface';

export class KuduVirtualScrollRenderTransform<V>
  implements KuduVirtualScrollRenderStrategy<V, 'transform'>
{
  constructor(public viewport: KuduVirtualScrollComponent<V, any>) {}

  compute(): KuduVirtualScrollRender<V>['transform'][] {
    const range = this.viewport.range();

    return this.viewport
      .elements()
      .slice(range.startIndex, range.endIndex + 1)
      .map((value, index) => ({
        value,
        index: range.startIndex + index,
      }));
  }
}
