import {
  ComponentRef,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map, merge } from 'rxjs';

import { KuduOverlayOriginDirective } from '../../overlay';

import { KuduTooltipComponent } from '../components/tooltip/tooltip.component';

export type KuduTooltipOrientation = 'left' | 'right' | 'under' | 'above';

@Directive({
  selector: '[kuduTooltip]',
  hostDirectives: [KuduOverlayOriginDirective],
})
export class KuduTooltipDirective implements OnDestroy {
  private vcRef = inject(ViewContainerRef);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private origin = inject(KuduOverlayOriginDirective);

  public tooltip = input.required<string | TemplateRef<any>>({
    alias: 'kuduTooltip',
  });

  public orientation = input<KuduTooltipOrientation>('under', {
    alias: 'kuduTooltipOrientation',
  });

  public isVisible = toSignal(
    merge(
      fromEvent(this.elementRef.nativeElement, 'mouseenter'),
      fromEvent(this.elementRef.nativeElement, 'mouseleave'),
    ).pipe(map((event) => event.type === 'mouseenter')),
  );

  private component?: ComponentRef<KuduTooltipComponent>;

  constructor() {
    effect(() => {
      if (this.isVisible()) {
        this.component = this.vcRef.createComponent(KuduTooltipComponent);
        this.component.setInput('origin', this.origin);
        this.component.setInput('tooltip', this.tooltip());
        this.component.setInput('orientation', this.orientation());
      } else {
        this.component?.destroy();
      }
    });
  }

  ngOnDestroy(): void {
    this.component?.destroy();
  }
}
