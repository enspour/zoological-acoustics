import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { KuduDialogContainerComponent } from '@kudu-ui';
import { ExplorerContainerComponent } from '@kudu/mfr-feature-explorer';

@Component({
  imports: [
    RouterOutlet,
    KuduDialogContainerComponent,
    ExplorerContainerComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public title = 'mfr-host';
}
