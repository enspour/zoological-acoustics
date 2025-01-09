import { KuduVirtualScrollComponent } from './virtual-scroll.component';

import {
  KuduVirtualScrollRender,
  KuduVirtualScrollRenderStrategy,
} from './virtual-scroll.interface';

export class KuduVirtualScrollRenderPosition<V>
  implements KuduVirtualScrollRenderStrategy<V, 'position'>
{
  constructor(public viewport: KuduVirtualScrollComponent<V, any>) {}

  compute(): KuduVirtualScrollRender<V>['position'][] {
    const range = this.viewport.range();

    return this.viewport
      .elements()
      .slice(range.startIndex, range.endIndex + 1)
      .map((value, index) => ({
        value,
        index: range.startIndex + index,
        offset: (range.startIndex + index) * this.viewport.elementHeight(),
      }));
  }
}
