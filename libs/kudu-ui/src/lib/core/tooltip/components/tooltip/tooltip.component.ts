import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import {
  KuduOverlayComponent,
  KuduOverlayOriginDirective,
} from '../../../overlay';

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
}
