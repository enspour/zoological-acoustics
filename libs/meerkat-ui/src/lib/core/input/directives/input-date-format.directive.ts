import { Directive, HostBinding, HostListener, model } from '@angular/core';

import { MkDate } from '@meerkat-date';

@Directive({
  selector: '[mkInputDateFormat]',
})
export class MkInputDateFormatDirective {
  public value = model<MkDate | undefined>(undefined, {
    alias: 'mkInputDateFormatValue',
  });

  @HostBinding('value')
  public get Value() {
    const value = this.value();
    return value ? value.toDate().toLocaleDateString().slice(0, 10) : '';
  }

  @HostListener('input', ['$event'])
  public onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const date = MkDate.fromString(target.value);

    if (date) {
      this.value.set(date);
    }
  }
}
