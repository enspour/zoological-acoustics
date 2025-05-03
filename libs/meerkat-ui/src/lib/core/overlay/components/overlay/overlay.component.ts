import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';

import { MkClickOutsideDirective } from '../../../click-outside';
import { MkTeleportDirective } from '../../../teleport';

import { MkOverlayContainerComponent } from '../overlay-container/overlay-container.component';

@Component({
  selector: 'mk-overlay',
  imports: [
    MkOverlayContainerComponent,
    MkTeleportDirective,
    MkClickOutsideDirective,
  ],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkOverlayComponent {
  public document = inject(DOCUMENT);

  public isOpen = input<boolean>(true);

  public byClickOutside = output<Event>();

  public onClickOutside(event: Event) {
    this.byClickOutside.emit(event);
  }
}
