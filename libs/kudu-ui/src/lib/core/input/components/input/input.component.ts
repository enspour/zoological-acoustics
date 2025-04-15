import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { kuduSize } from '../../../size';

@Component({
  selector: 'input[kudu-input]',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduInputComponent {
  private size = inject(kuduSize);

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }
}
