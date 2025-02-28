import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  inject,
  output,
} from '@angular/core';

import { kuduSize } from '../../../size';
import { kuduMenuItemToken } from '../../tokens/menu-item.token';

@Component({
  selector: 'button[kudu-menu-button]',
  imports: [],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: kuduMenuItemToken, useExisting: KuduMenuButtonComponent },
  ],
})
export class KuduMenuButtonComponent {
  private size = inject(kuduSize);

  public byClick = output<Event>();

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }

  @HostListener('click', ['$event'])
  public onClick(event: Event) {
    this.byClick.emit(event);
  }
}
