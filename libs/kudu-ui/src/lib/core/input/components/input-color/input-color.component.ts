import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  model,
} from '@angular/core';

import {
  KuduColorPickerComponent,
  KuduColorSelectorComponent,
} from '../../../color-selector';

import { KuduPopupComponent, KuduPopupConfig } from '../../../popup';

@Component({
  selector: 'input[kudu-input-color]',
  imports: [
    KuduPopupComponent,
    KuduColorPickerComponent,
    KuduColorSelectorComponent,
  ],
  templateUrl: './input-color.component.html',
  styleUrl: './input-color.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduInputColorComponent {
  public value = model<string>('#21d636');

  public config: KuduPopupConfig = {
    width: 'self-width',
    placement: 'bottom-left',
    gap: 4,
  };

  @HostBinding('value')
  public get Value() {
    return this.value();
  }
}
