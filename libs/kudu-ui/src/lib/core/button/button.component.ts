import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input,
} from '@angular/core';

import { kuduSize } from '../size';
import { KuduButtonKind } from './button.interface';

@Component({
  selector: 'button[kudu-button]',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduButtonComponent {
  public size = inject(kuduSize);

  public kind = input<KuduButtonKind>('outlined');

  @HostBinding('class')
  public get Classes() {
    return `${this.size()} ${this.kind()}`;
  }
}
