import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';

import { DateTime } from '@kudu-date';

import { KuduCalendarComponent } from '../../../calendar';

import {
  KuduOverlayComponent,
  KuduOverlayConfig,
  KuduOverlayOriginDirective,
} from '../../../overlay';

import { KuduActiveZoneDirective } from '../../../active-zone';
import { KuduInputDateValidatorDirective } from '../../directives';

@Component({
  selector: 'input[kudu-input-date]',
  imports: [KuduOverlayComponent, KuduCalendarComponent],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: KuduInputDateValidatorDirective,
      inputs: ['kuduInputDateValidatorValue: value'],
      outputs: ['kuduInputDateValidatorValueChange: valueChange'],
    },
  ],
})
export class KuduInputDateComponent {
  private activeZoneDirective = inject(KuduActiveZoneDirective);

  public origin = inject(KuduOverlayOriginDirective);

  public value = model<DateTime>();

  public isFocus = this.activeZoneDirective.active;

  public config: KuduOverlayConfig = {
    width: 'self-width',
    gap: 4,
  };
}
