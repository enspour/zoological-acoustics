import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
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

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }
}
