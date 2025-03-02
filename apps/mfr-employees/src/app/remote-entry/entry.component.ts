import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mfr-employees-entry',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: `
    :host {
      flex: 1;
      min-width: 0;
    }
  `,
  providers: [],
})
export class RemoteEntryComponent {}
