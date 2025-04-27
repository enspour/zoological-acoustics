import { Directive, HostBinding, HostListener, model } from '@angular/core';

import { KuduDate } from '@kudu-date';

@Directive({
  selector: '[kuduInputDateFormat]',
})
export class KuduInputDateFormatDirective {
  public value = model<KuduDate | undefined>(undefined, {
    alias: 'kuduInputDateFormatValue',
  });

  @HostBinding('value')
  public get Value() {
    const value = this.value();
    return value ? value.toDate().toLocaleDateString().slice(0, 10) : '';
  }

  @HostListener('input', ['$event'])
  public onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const date = KuduDate.fromString(target.value);

    if (date) {
      this.value.set(date);
    }
  }
}
