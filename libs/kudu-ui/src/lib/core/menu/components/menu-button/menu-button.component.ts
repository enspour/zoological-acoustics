import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  output,
} from '@angular/core';

import { kuduSize } from '../../../size';

@Component({
  selector: 'kudu-menu-button',
  imports: [],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduMenuButtonComponent {
  private size = inject(kuduSize);

  public byClick = output<void>();

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }
}
