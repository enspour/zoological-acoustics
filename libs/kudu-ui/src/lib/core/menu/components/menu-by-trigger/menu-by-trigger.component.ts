import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { KuduPopupComponent } from '../../../popup/components/popup/popup.component';
import { kuduSize } from '../../../size';

@Component({
  selector: 'kudu-menu-by-trigger',
  imports: [KuduPopupComponent],
  templateUrl: './menu-by-trigger.component.html',
  styleUrl: './menu-by-trigger.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduMenuByTriggerComponent {
  private size = inject(kuduSize);

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }
}
