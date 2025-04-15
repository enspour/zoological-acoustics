import { Directive, HostBinding, HostListener, model } from '@angular/core';

import { DateTime } from '@kudu-date';

@Directive({
  selector: '[kuduInputDateValidator]',
})
export class KuduInputDateValidatorDirective {
  public value = model<DateTime | undefined>(undefined, {
    alias: 'kuduInputDateValidatorValue',
  });

  @HostBinding('value')
  public get Value() {
    const value = this.value();
    return value ? value.toDate().toLocaleDateString().slice(0, 10) : '';
  }

  @HostListener('input', ['$event'])
  public onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const date = DateTime.fromStringByDatePatterns(target.value);

    if (date) {
      this.value.set(date);
    }
  }
}
