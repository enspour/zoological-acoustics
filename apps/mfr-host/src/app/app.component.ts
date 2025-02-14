import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {
  KuduDialogContainerComponent,
  KuduOverlayContainerComponent,
} from '@kudu-ui';

@Component({
  imports: [
    RouterOutlet,
    KuduDialogContainerComponent,
    KuduOverlayContainerComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public title = 'mfr-host';
}
