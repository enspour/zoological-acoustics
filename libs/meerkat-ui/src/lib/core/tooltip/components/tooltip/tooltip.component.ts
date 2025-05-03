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
  MkOverlayFlexibleConfig,
  MkOverlayFlexibleOriginDirective,
  MkOverlayFlexiblePositionDirective,
} from '../../../overlay';

import { MkTooltipPlacement } from '../../directives/tooltip.directive';

@Component({
  selector: 'mk-tooltip',
  imports: [
    NgTemplateOutlet,
    MkOverlayComponent,
    MkOverlayFlexiblePositionDirective,
  ],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkTooltipComponent {
  public origin = input.required<MkOverlayFlexibleOriginDirective>();

  public tooltip = input.required<string | TemplateRef<any>>();

  public placement = input.required<MkTooltipPlacement>();

  public config = computed<MkOverlayFlexibleConfig>(() => ({
    width: 'self-width',
    placement: this.placement(),
    gap: 4,
  }));

  public isTemplateRef(value: unknown): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }
}
