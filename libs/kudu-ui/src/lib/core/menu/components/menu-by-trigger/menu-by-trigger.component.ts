import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  output,
} from '@angular/core';

import { KuduPopupComponent } from '../../../popup/components/popup/popup.component';
import { kuduSize } from '../../../size';

import { KuduMenuTriggerDirective } from '../../directives/menu-trigger.directive';
import { KuduMenu } from '../../interfaces';
import { kuduMenu } from '../../tokens';

@Component({
  selector: 'kudu-menu-by-trigger',
  imports: [KuduPopupComponent],
  templateUrl: './menu-by-trigger.component.html',
  styleUrl: './menu-by-trigger.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: kuduMenu,
      useExisting: KuduMenuByTriggerComponent,
    },
  ],
})
export class KuduMenuByTriggerComponent implements KuduMenu {
  private size = inject(kuduSize);
  private trigger = inject(KuduMenuTriggerDirective);

  public byClick = output<void>();

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }

  public click() {
    this.byClick.emit();
    this.trigger.close();
  }
}
