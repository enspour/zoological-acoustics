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

import { MkOverlayOriginDirective } from '../../overlay';

import { MkTooltipComponent } from '../components/tooltip/tooltip.component';

export type MkTooltipPlacement = 'left' | 'right' | 'bottom' | 'top';

@Directive({
  selector: '[mkTooltip]',
  hostDirectives: [MkOverlayOriginDirective],
})
export class MkTooltipDirective implements OnDestroy {
  private vcRef = inject(ViewContainerRef);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private origin = inject(MkOverlayOriginDirective);

  public tooltip = input.required<string | TemplateRef<any>>({
    alias: 'mkTooltip',
  });

  public placement = input<MkTooltipPlacement>('bottom', {
    alias: 'mkTooltipPlacement',
  });

  public isDisabled = input<boolean>(false, {
    alias: 'mkTooltipDisabled',
  });

  public isVisible = toSignal(
    merge(
      fromEvent(this.elementRef.nativeElement, 'mouseenter'),
      fromEvent(this.elementRef.nativeElement, 'mouseleave'),
    ).pipe(map((event) => event.type === 'mouseenter')),
  );

  private component?: ComponentRef<MkTooltipComponent>;

  constructor() {
    effect(() => {
      if (this.isVisible() && !this.isDisabled()) {
        this.component = this.vcRef.createComponent(MkTooltipComponent);
        this.component.setInput('origin', this.origin);
        this.component.setInput('tooltip', this.tooltip());
        this.component.setInput('placement', this.placement());
      } else {
        this.component?.destroy();
      }
    });
  }

  ngOnDestroy(): void {
    this.component?.destroy();
  }
}
