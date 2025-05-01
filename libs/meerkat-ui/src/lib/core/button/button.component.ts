import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input,
} from '@angular/core';

import { mkSize } from '../size';
import { MkButtonKind } from './button.interface';

@Component({
  selector: 'button[mk-button]',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkButtonComponent {
  public size = inject(mkSize);

  public kind = input<MkButtonKind>('outlined');

  @HostBinding('class')
  public get Classes() {
    return `${this.size()} ${this.kind()}`;
  }
}
