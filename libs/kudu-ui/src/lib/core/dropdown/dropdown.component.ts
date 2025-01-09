import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  HostBinding,
  inject,
  model,
} from '@angular/core';
import { intersectionObservable } from '../../utils';

export type KuduDropdownPosition = 'top' | 'bottom';

@Component({
  selector: 'kudu-dropdown',
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduDropdownComponent {
  private elementRef = inject(ElementRef);

  public position = model<KuduDropdownPosition>('top');

  private intersectionObserver = intersectionObservable(this.elementRef, {
    threshold: [0, 1],
  });

  constructor() {
    effect(() => {
      const entry = this.intersectionObserver();
      if (entry) {
        this.onIntersection(entry);
      }
    });
  }

  @HostBinding('class')
  public get Classes() {
    return `${this.position()}`;
  }

  public onIntersection(entry: IntersectionObserverEntry) {
    if (!entry.rootBounds) {
      return;
    }

    const bottom =
      this.position() === 'top'
        ? entry.intersectionRect.bottom
        : entry.intersectionRect.bottom * 2;

    if (bottom >= entry.rootBounds.bottom) {
      this.position.set('bottom');
    } else {
      this.position.set('top');
    }
  }
}
