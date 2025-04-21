import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  inject,
  output,
} from '@angular/core';

import { kuduSize } from '../../../size';

@Component({
  selector: 'button[kudu-menu-button]',
  imports: [],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
