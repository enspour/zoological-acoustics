import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import {
  MkVirtualizationDirective,
  MkVirtualizeByRangeDirective,
} from '../virtualization';

@Component({
  selector: 'mk-virtual-scroll',
  standalone: true,
  imports: [],
  templateUrl: './virtual-scroll.component.html',
  styleUrl: './virtual-scroll.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: MkVirtualizationDirective,
      inputs: ['elements', 'viewport'],
    },
    {
      directive: MkVirtualizeByRangeDirective,
      inputs: ['elementHeight', 'overScan'],
    },
  ],
})
export class MkVirtualScrollComponent<T> {
  private virtualization = inject(MkVirtualizationDirective);

  public elementHeight = input.required<number>();
  public elements = input.required<T[]>();

  public overScan = input<number>(5);

  public scroll = computed(() => this.computeScroll());

  public totalHeight = computed(() => this.computeTotalHeight());

  private computeScroll() {
    const top = this.virtualization.viewportScroll()?.top || 0;
    const scroll = top - this.overScan() * this.elementHeight();

    return scroll >= 0 ? scroll : 0;
  }

  private computeTotalHeight() {
    return this.elementHeight() * this.elements().length;
  }
}
