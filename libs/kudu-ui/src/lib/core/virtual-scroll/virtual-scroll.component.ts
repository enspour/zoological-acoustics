import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostBinding,
  inject,
  input,
} from '@angular/core';

import { KuduVirtualScrollRenderPosition } from './virtual-scroll-render-position';
import { KuduVirtualScrollRenderTransform } from './virtual-scroll-render-transform';

import {
  KuduVirtualScrollRange,
  KuduVirtualScrollRender,
  KuduVirtualScrollRenderType,
} from './virtual-scroll.interface';

import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { heightSignal, scrollSignal } from '../../utils';

const isSameRange = (A: KuduVirtualScrollRange, B: KuduVirtualScrollRange) =>
  A.startIndex === B.startIndex && A.endIndex === B.endIndex;

@Component({
  selector: 'kudu-virtual-scroll',
  standalone: true,
  imports: [],
  templateUrl: './virtual-scroll.component.html',
  styleUrl: './virtual-scroll.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduVirtualScrollComponent<
  V,
  T extends KuduVirtualScrollRenderType<V>,
> {
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  public render = input<T>('transform' as T);

  public elementHeight = input.required<number>();
  public elements = input.required<V[]>();

  public overScan = input<number>(5);

  public range = computed(() => this.computeRange(), { equal: isSameRange });
  public range$ = toObservable(this.range);
  public byRangeChange = outputFromObservable(this.range$);

  public rangeElements = computed(() => this.computeElementsToRender());
  public rangeElements$ = toObservable(this.rangeElements);
  public byRangeElementsChange = outputFromObservable(this.rangeElements$);

  public viewportHeight = heightSignal(this.elementRef);
  public viewportScroll = scrollSignal(this.elementRef);

  public totalHeight = computed(() => this.computeTotalHeight());

  @HostBinding('class')
  public get Classes() {
    return `${this.render()}`;
  }

  private computeRange() {
    const viewportHeight = this.viewportHeight();
    const viewportScroll = this.viewportScroll();

    if (
      typeof viewportHeight === 'undefined' ||
      typeof viewportScroll === 'undefined'
    ) {
      return { startIndex: 0, endIndex: 0 };
    }

    const start = viewportScroll;
    const end = viewportScroll + viewportHeight;

    let startIndex = Math.floor(start / this.elementHeight()) - this.overScan();
    let endIndex = Math.ceil(end / this.elementHeight()) + this.overScan();

    startIndex = Math.max(0, startIndex);
    endIndex = Math.min(this.elements().length - 1, endIndex);

    return { startIndex, endIndex };
  }

  private computeTotalHeight() {
    return this.elementHeight() * this.elements().length;
  }

  private computeElementsToRender(): KuduVirtualScrollRender<V>[T][] {
    const name = this.render();

    if (name === 'position') {
      const render = new KuduVirtualScrollRenderPosition(this);
      return render.compute() as KuduVirtualScrollRender<V>[T][];
    }

    if (name === 'transform') {
      const render = new KuduVirtualScrollRenderTransform(this);
      return render.compute() as KuduVirtualScrollRender<V>[T][];
    }

    return [];
  }
}
