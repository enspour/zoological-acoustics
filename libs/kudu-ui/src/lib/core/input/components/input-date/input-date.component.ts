import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';

import { KuduDate } from '@kudu-date';

import { KuduCalendarComponent } from '../../../calendar';

import {
  KuduPopupComponent,
  KuduPopupConfig,
  KuduPopupTriggerDirective,
} from '../../../popup';

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
  private trigger = inject(KuduPopupTriggerDirective);

  public value = model<KuduDate>();

  public config: KuduPopupConfig = {
    width: 'self-width',
    placement: 'bottom-left',
    gap: 4,
  };

  public onDateClick() {
    this.trigger.close();
  }
}
