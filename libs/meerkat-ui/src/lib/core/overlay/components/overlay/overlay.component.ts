import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';

import { MkClickOutsideDirective } from '../../../click-outside';
import { MkTeleportDirective } from '../../../teleport';

import { MkOverlayOriginDirective } from '../../directives/overlay-origin.directive';
import { MkOverlayContainerComponent } from '../overlay-container/overlay-container.component';

import { MkOverlayConfig, MkOverlayPlacement } from '../../interfaces';

const initialConfig: Required<MkOverlayConfig> = {
  width: 'self-width',
  placement: 'bottom-left',
  lockX: false,
  lockY: false,
  gap: 0,
};

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

  public origin = input.required<MkOverlayOriginDirective>();

  public _config = input<MkOverlayConfig>(undefined, { alias: 'config' });
  public config = computed(() => ({ ...initialConfig, ...this._config() }));

  public placementChange = output<MkOverlayPlacement>();

  public byClickOutside = output<Event>();

  public onClickOutside(event: Event) {
    this.byClickOutside.emit(event);
  }
}
