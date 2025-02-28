import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  HostBinding,
  inject,
  input,
  model,
} from '@angular/core';

import { KuduOverlayComponent } from '../../../overlay';
import { kuduSize } from '../../../size';
import { KuduMenuTriggerDirective } from '../../directives/menu-trigger.directive';
import { kuduMenuItemToken } from '../../tokens/menu-item.token';

@Component({
  selector: 'kudu-menu-by-trigger',
  imports: [KuduOverlayComponent],
  templateUrl: './menu-by-trigger.component.html',
  styleUrl: './menu-by-trigger.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduMenuByTriggerComponent {
  private size = inject(kuduSize);

  private items = contentChildren(kuduMenuItemToken);

  public isOpen = model(false);

  public trigger = input.required<KuduMenuTriggerDirective>();

  constructor() {
    effect((onCleanup) => {
      const subscriptions = this.items().map((item) =>
        item.byClick.subscribe(() => this.close()),
      );

      onCleanup(() => subscriptions.forEach((s) => s.unsubscribe()));
    });
  }

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }

  public close() {
    this.isOpen.set(false);
  }
}
