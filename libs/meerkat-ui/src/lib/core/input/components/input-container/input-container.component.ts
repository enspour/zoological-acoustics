import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { MkPopupTriggerDirective } from '../../../popup';
import { mkSize } from '../../../size';

@Component({
  selector: 'mk-input-container',
  imports: [],
  templateUrl: './input-container.component.html',
  styleUrl: './input-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [MkPopupTriggerDirective],
})
export class MkInputContainerComponent {
  private size = inject(mkSize);

  private trigger = inject(MkPopupTriggerDirective);

  @HostBinding('class')
  public get Classes() {
    return `
      ${this.size()}
      ${this.trigger.isOpen() ? 'focused' : ''}
    `;
  }
}
