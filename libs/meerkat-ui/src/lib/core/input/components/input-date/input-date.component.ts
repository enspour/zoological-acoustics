import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';

import { MkDate } from '@meerkat-date';

import { MkCalendarComponent } from '../../../calendar';

import {
  MkPopupComponent,
  MkPopupConfig,
  MkPopupTriggerDirective,
} from '../../../popup';

import { MkInputDateFormatDirective } from '../../directives';

@Component({
  selector: 'input[mk-input-date]',
  imports: [MkCalendarComponent, MkPopupComponent],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: MkInputDateFormatDirective,
      inputs: ['mkInputDateFormatValue: value'],
      outputs: ['mkInputDateFormatValueChange: valueChange'],
    },
  ],
})
export class MkInputDateComponent {
  private trigger = inject(MkPopupTriggerDirective);

  public value = model<MkDate>();

  public config: MkPopupConfig = {
    width: 'self-width',
    placement: 'bottom-left',
    gap: 4,
  };

  public onDateClick() {
    this.trigger.close();
  }
}
