import { ChangeDetectionStrategy, Component, model } from '@angular/core';

import { KuduDate } from '@kudu-date';

import { KuduCalendarComponent } from '../../../calendar';

import { KuduPopupComponent, KuduPopupConfig } from '../../../popup';

import { KuduInputDateFormatDirective } from '../../directives';

@Component({
  selector: 'input[kudu-input-date]',
  imports: [KuduCalendarComponent, KuduPopupComponent],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: KuduInputDateFormatDirective,
      inputs: ['kuduInputDateFormatValue: value'],
      outputs: ['kuduInputDateFormatValueChange: valueChange'],
    },
  ],
})
export class KuduInputDateComponent {
  public value = model<KuduDate>();

  public config: KuduPopupConfig = {
    width: 'self-width',
    position: 'under-left',
    gap: 4,
  };
}
