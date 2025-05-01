import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  TemplateRef,
} from '@angular/core';

import {
  MkOverlayComponent,
  MkOverlayConfig,
  MkOverlayOriginDirective,
} from '../../../overlay';

import { MkTooltipPlacement } from '../../directives/tooltip.directive';

@Component({
  selector: 'mk-tooltip',
  imports: [NgTemplateOutlet, MkOverlayComponent],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkTooltipComponent {
  public origin = input.required<MkOverlayOriginDirective>();

  public tooltip = input.required<string | TemplateRef<any>>();

  public placement = input.required<MkTooltipPlacement>();

  public config = computed<MkOverlayConfig>(() => ({
    width: 'self-width',
    placement: this.placement(),
    gap: 4,
  }));

  public isTemplateRef(value: unknown): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }
}
