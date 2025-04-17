import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-mfr-projects-entry',
  template: `<router-outlet />`,
  styles: `
    :host {
      flex: 1;
      min-width: 0;
    }
  `,
})
export class RemoteEntryComponent {}
