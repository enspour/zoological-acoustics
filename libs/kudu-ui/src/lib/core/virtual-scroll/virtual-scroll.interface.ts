import { KuduVirtualScrollComponent } from './virtual-scroll.component';

export interface KuduVirtualScrollRange {
  startIndex: number;
  endIndex: number;
}

export type KuduVirtualScrollRender<V> = {
  transform: { value: V; index: number };
  position: { value: V; index: number; offset: number };
};

export type KuduVirtualScrollRenderType<V> = keyof KuduVirtualScrollRender<V>;

export type KuduVirtualScrollRenderStrategy<
  V,
  T extends KuduVirtualScrollRenderType<V>,
> = {
  viewport: KuduVirtualScrollComponent<V, T>;
  compute(): KuduVirtualScrollRender<V>[T][];
};
