import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { kuduSize } from '../size';

@Component({
  selector: 'kudu-chip',
  imports: [],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduChipComponent {
  public size = inject(kuduSize);

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }
}
