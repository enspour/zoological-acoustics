import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { KuduPopupTriggerDirective } from '../../../popup';
import { kuduSize } from '../../../size';

@Component({
  selector: 'kudu-input-container',
  imports: [],
  templateUrl: './input-container.component.html',
  styleUrl: './input-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [KuduPopupTriggerDirective],
  host: {
    tabindex: '1',
  },
})
export class KuduInputContainerComponent {
  private size = inject(kuduSize);

  private trigger = inject(KuduPopupTriggerDirective);

  @HostBinding('class')
  public get Classes() {
    return `
      ${this.size()}
      ${this.trigger.isOpen() ? 'focused' : ''}
    `;
  }
}
