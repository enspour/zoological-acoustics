import { Component, HostBinding } from '@angular/core';

let counter = 0;

@Component({
  template: '',
})
export class UniqueComponent {
  @HostBinding('host-id')
  public get HostId() {
    return `comp-${counter++}-${Math.random().toString(36).substring(2, 6)}`;
  }
}
