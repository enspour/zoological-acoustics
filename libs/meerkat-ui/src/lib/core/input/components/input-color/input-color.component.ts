import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  model,
} from '@angular/core';

import {
  MkColorPickerComponent,
  MkColorSelectorComponent,
} from '../../../color-selector';

import { MkPopupComponent, MkPopupConfig } from '../../../popup';

@Component({
  selector: 'input[mk-input-color]',
  imports: [MkPopupComponent, MkColorPickerComponent, MkColorSelectorComponent],
  templateUrl: './input-color.component.html',
  styleUrl: './input-color.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkInputColorComponent {
  public value = model<string>('#ffffff');

  public config: MkPopupConfig = {
    width: 'self-width',
    placement: 'bottom-left',
    gap: 4,
  };

  @HostBinding('value')
  public get Value() {
    return this.value();
  }
}
