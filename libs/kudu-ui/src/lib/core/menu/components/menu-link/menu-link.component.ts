import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { kuduSize } from '../../../size';

@Component({
  selector: 'kudu-menu-link',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-link.component.html',
  styleUrl: './menu-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduMenuLinkComponent {
  private size = inject(kuduSize);

  public href = input.required<string>();

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }
}
