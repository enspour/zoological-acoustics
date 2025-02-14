import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input,
  model,
} from '@angular/core';

import { KuduOverlayComponent } from '../../../overlay';

import { KuduMenuTriggerDirective } from '../../directives/menu-trigger.directive';

import { kuduSize } from '../../../size';

@Component({
  selector: 'kudu-menu-by-trigger',
  imports: [KuduOverlayComponent],
  templateUrl: './menu-by-trigger.component.html',
  styleUrl: './menu-by-trigger.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduMenuByTriggerComponent {
  private size = inject(kuduSize);

  public isOpen = model(false);

  public trigger = input.required<KuduMenuTriggerDirective>();

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }
}
