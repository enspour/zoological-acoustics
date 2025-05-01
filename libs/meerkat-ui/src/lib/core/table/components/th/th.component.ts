import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { mkSize } from '../../../size';

@Component({
  selector: 'th[mk-th]',
  imports: [],
  templateUrl: './th.component.html',
  styleUrl: './th.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkTableHeaderComponent {
  private size = inject(mkSize);

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }
}
