import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { mkSize } from '../../../size';

@Component({
  selector: 'input[mk-input]',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkInputComponent {
  private size = inject(mkSize);

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }
}
