import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
} from '@angular/core';

import { MkZoneDirective } from '../../../zone';

import { mkOverlayPosition } from '../../tokens';

@Component({
  selector: 'mk-overlay-container',
  imports: [],
  templateUrl: './overlay-container.component.html',
  styleUrl: './overlay-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.top.px]': 'layout().top',
    '[style.left.px]': 'layout().left',
    '[style.width.px]': 'layout().width',
  },
  hostDirectives: [MkZoneDirective],
})
export class MkOverlayContainerComponent implements OnDestroy {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private position = inject(mkOverlayPosition);

  public layout = this.position.attach(this.elementRef);

  ngOnDestroy(): void {
    this.position.dispose();
  }
}
