import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  inject,
  output,
} from '@angular/core';

import { mkSize } from '../../../size';
import { mkMenu } from '../../tokens';

@Component({
  selector: 'button[mk-menu-button]',
  imports: [],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkMenuButtonComponent {
  private size = inject(mkSize);
  private menu = inject(mkMenu);

  public byClick = output<Event>();

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }

  @HostListener('click', ['$event'])
  public onClick(event: Event) {
    this.byClick.emit(event);
    this.menu.click();
  }
}
