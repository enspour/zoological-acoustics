import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  TemplateRef,
} from '@angular/core';

import {
  KuduOverlayComponent,
  KuduOverlayConfig,
  KuduOverlayOriginDirective,
} from '../../../overlay';

import { KuduTooltipOrientation } from '../../directives/tooltip.directive';

@Component({
  selector: 'kudu-tooltip',
  imports: [NgTemplateOutlet, KuduOverlayComponent],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduTooltipComponent {
  public origin = input.required<KuduOverlayOriginDirective>();

  public tooltip = input.required<string | TemplateRef<any>>();

  public orientation = input.required<KuduTooltipOrientation>();

  public config = computed<KuduOverlayConfig>(() => ({
    width: 'self-width',
    placement: this.orientation(),
    gap: 4,
  }));

  public isTemplateRef(value: unknown): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }
}
