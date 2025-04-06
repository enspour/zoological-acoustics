import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  model,
} from '@angular/core';

import { DateTime } from '@kudu-date';

@Component({
  selector: 'input[kudu-input-date]',
  imports: [],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduInputDateComponent {
  public value = model<Date | string | number>();

  @HostBinding('value')
  public get Value() {
    const value = this.value();
    return value ? new Date(value).toLocaleDateString().slice(0, 10) : '';
  }

  @HostListener('input', ['$event'])
  public onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const datetime = DateTime.fromStringByDatePatterns(target.value);

    if (datetime) {
      this.value.set(datetime.toDate());
    }
  }
}
