import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  output,
} from '@angular/core';

import { MkPopupComponent } from '../../../popup/components/popup/popup.component';
import { mkSize } from '../../../size';

import { MkMenuTriggerDirective } from '../../directives/menu-trigger.directive';

import { MkMenuComponent } from '../menu/menu.component';

import { MkMenu } from '../../interfaces';

import { mkMenu } from '../../tokens';

@Component({
  selector: 'mk-menu-by-trigger',
  imports: [MkPopupComponent, MkMenuComponent],
  templateUrl: './menu-by-trigger.component.html',
  styleUrl: './menu-by-trigger.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: mkMenu,
      useExisting: MkMenuByTriggerComponent,
    },
  ],
})
export class MkMenuByTriggerComponent implements MkMenu {
  private size = inject(mkSize);
  private trigger = inject(MkMenuTriggerDirective);

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
