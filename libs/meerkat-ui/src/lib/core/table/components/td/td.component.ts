import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { mkSize } from '../../../size';

@Component({
  selector: 'td[mk-td]',
  imports: [],
  templateUrl: './td.component.html',
  styleUrl: './td.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkTableDataCellComponent {
  private size = inject(mkSize);

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }
}
