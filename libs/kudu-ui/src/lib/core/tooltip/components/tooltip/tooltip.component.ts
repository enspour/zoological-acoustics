import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import {
  KuduOverlayComponent,
  KuduOverlayConfig,
  KuduOverlayOriginDirective,
} from '../../../overlay';

import { KuduTooltipOrientation } from '../../directives/tooltip.directive';

@Component({
  selector: 'kudu-tooltip',
  imports: [KuduOverlayComponent],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduTooltipComponent {
  public origin = input.required<KuduOverlayOriginDirective>();
  public tooltip = input.required<string>();
  public orientation = input.required<KuduTooltipOrientation>();

  public config = computed<KuduOverlayConfig>(() => ({
    width: 'self-width',
    position: this.orientation(),
    gap: 4,
  }));
}
