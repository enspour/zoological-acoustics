import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { kuduSize } from '../../../size';

@Component({
  selector: 'td[kudu-td]',
  imports: [],
  templateUrl: './td.component.html',
  styleUrl: './td.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduTableDataCellComponent {
  private size = inject(kuduSize);

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }
}
