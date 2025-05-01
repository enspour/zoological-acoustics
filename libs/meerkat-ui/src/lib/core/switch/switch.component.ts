import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { mkSize } from '../size';

@Component({
  selector: 'input[mk-switch]',
  imports: [],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'checkbox',
  },
})
export class MkSwitchComponent {
  public size = inject(mkSize);

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }
}
