import { ChangeDetectionStrategy, Component, model } from '@angular/core';

import { DateTime } from '@kudu-date';

import { KuduCalendarComponent } from '../../../calendar';

import { KuduPopupComponent, KuduPopupConfig } from '../../../popup';

import { KuduInputDateValidatorDirective } from '../../directives';

@Component({
  selector: 'input[kudu-input-date]',
  imports: [KuduCalendarComponent, KuduPopupComponent],
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
  public value = model<DateTime>();

  public config: KuduPopupConfig = {
    width: 'self-width',
    gap: 4,
  };
}
