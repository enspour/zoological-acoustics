import { ChangeDetectionStrategy, Component, output } from '@angular/core';

import { MkMenu } from '../../interfaces';
import { mkMenu } from '../../tokens';

@Component({
  selector: 'mk-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: mkMenu,
      useExisting: MkMenuComponent,
    },
  ],
})
export class MkMenuComponent implements MkMenu {
  public byClick = output<void>();

  public click() {
    this.byClick.emit();
  }
}
