import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

import { KuduClickOutsideDirective } from '../../../click-outside';
import { KuduTeleportDirective } from '../../../portals';
import { KuduOverlayOriginDirective } from '../../directives/overlay-origin.directive';
import { KuduOverlayContentComponent } from '../overlay-content/overlay-content.component';

export type KuduOverlayPositionY = 'above' | 'under';
export type KuduOverlayPositionX = 'left' | 'right' | 'center';

export interface KuduOverlayConfig {
  width?: 'origin-width' | 'self-width';
  positionX?: KuduOverlayPositionX;
  positionY?: KuduOverlayPositionY;
  lockX?: boolean;
  lockY?: boolean;
  gap?: number;
}

const initialConfig: Required<KuduOverlayConfig> = {
  width: 'self-width',
  positionX: 'left',
  positionY: 'under',
  lockX: false,
  lockY: false,
  gap: 0,
};

@Component({
  selector: 'kudu-overlay',
  imports: [
    KuduOverlayContentComponent,
    KuduTeleportDirective,
    KuduClickOutsideDirective,
  ],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduOverlayComponent {
  public isOpen = input<boolean>(true);

  public origin = input.required<KuduOverlayOriginDirective>();

  public _config = input<KuduOverlayConfig>(undefined, { alias: 'config' });
  public config = computed(() => ({ ...initialConfig, ...this._config() }));

  public positionXChange = output<KuduOverlayPositionX>();
  public positionYChange = output<KuduOverlayPositionY>();

  public byClickOutside = output<Event>();

  public onClickOutside(event: Event) {
    this.byClickOutside.emit(event);
  }
}
