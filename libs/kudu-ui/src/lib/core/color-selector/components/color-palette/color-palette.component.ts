import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input,
  model,
} from '@angular/core';

import { kuduSize } from '../../../size';

@Component({
  selector: 'kudu-color-palette',
  imports: [],
  templateUrl: './color-palette.component.html',
  styleUrl: './color-palette.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduColorPaletteComponent {
  private size = inject(kuduSize);

  public color = model.required<string>();

  public colors = input<string[]>();

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }
}
