import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input,
} from '@angular/core';

import { kuduSize } from '../../../size';

import { KuduInputKind } from './input.interface';

@Component({
  selector: 'input[kudu-input]',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduInputComponent {
  public size = inject(kuduSize);

  public kind = input<KuduInputKind>('outlined');

  @HostBinding('class')
  public get Classes() {
    return `${this.size()} ${this.kind()}`;
  }
}
