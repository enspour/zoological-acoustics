import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input,
  model,
} from '@angular/core';

import { mkSize } from '../../../size';

@Component({
  selector: 'mk-color-palette',
  imports: [],
  templateUrl: './color-palette.component.html',
  styleUrl: './color-palette.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkColorPaletteComponent {
  private size = inject(mkSize);

  public color = model.required<string>();

  public colors = input<string[]>();

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }
}
