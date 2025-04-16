import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  HostBinding,
  inject,
} from '@angular/core';

import { KuduPopupComponent } from '../../../popup/components/popup/popup.component';
import { kuduSize } from '../../../size';
import { kuduMenuItem } from '../../tokens/menu-item.token';

@Component({
  selector: 'kudu-menu-by-trigger',
  imports: [KuduPopupComponent],
  templateUrl: './menu-by-trigger.component.html',
  styleUrl: './menu-by-trigger.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduMenuByTriggerComponent {
  private size = inject(kuduSize);

  private items = contentChildren(kuduMenuItem);

  constructor() {
    // effect((onCleanup) => {
    //   const subscriptions = this.items().map((item) =>
    //     item.byClick.subscribe(() => this.close()),
    //   );
    //   onCleanup(() => subscriptions.forEach((s) => s.unsubscribe()));
    // });
  }

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }
}
