import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { mkSize } from '../size';

@Component({
  selector: 'input[mk-checkbox]',
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'checkbox',
  },
})
export class MkCheckboxComponent {
  public size = inject(mkSize);

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }
}
