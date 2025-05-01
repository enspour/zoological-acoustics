import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { mkSize } from '../size';

@Component({
  selector: 'mk-chip',
  imports: [],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkChipComponent {
  public size = inject(mkSize);

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }
}
