import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { kuduSize } from '../../../size';

@Component({
  selector: 'th[kudu-th]',
  imports: [],
  templateUrl: './th.component.html',
  styleUrl: './th.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduTableHeaderComponent {
  private size = inject(kuduSize);

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }
}
