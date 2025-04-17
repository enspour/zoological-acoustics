import { Directive, HostBinding, HostListener, model } from '@angular/core';

import { KuduDate } from '@kudu-date';

@Directive({
  selector: '[kuduInputDateValidator]',
})
export class KuduInputDateValidatorDirective {
  public value = model<KuduDate | undefined>(undefined, {
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
    const date = KuduDate.fromString(target.value);

    if (date) {
      this.value.set(date);
    }
  }
}
