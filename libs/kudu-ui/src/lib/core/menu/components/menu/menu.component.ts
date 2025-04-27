import { ChangeDetectionStrategy, Component, output } from '@angular/core';

import { KuduMenu } from '../../interfaces';
import { kuduMenu } from '../../tokens';

@Component({
  selector: 'kudu-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: kuduMenu,
      useExisting: KuduMenuComponent,
    },
  ],
})
export class KuduMenuComponent implements KuduMenu {
  public byClick = output<void>();

  public click() {
    this.byClick.emit();
  }
}
