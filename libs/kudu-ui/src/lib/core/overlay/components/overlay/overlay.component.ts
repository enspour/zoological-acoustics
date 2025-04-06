import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';

import { KuduTeleportDirective } from '../../../portals';
import { KuduOverlayOriginDirective } from '../../directives/overlay-origin.directive';
import { KuduOverlayContentComponent } from '../overlay-content/overlay-content.component';

export type KuduOverlayPositionY = 'above' | 'under';
export type KuduOverlayPositionX = 'left' | 'right' | 'center';

export interface KuduOverlayConfig {
  width: 'origin-width' | 'self-width';
  positionX: KuduOverlayPositionX;
  positionY: KuduOverlayPositionY;
  lockX: boolean;
  lockY: boolean;
  gap: number;
}

const initialConfig: KuduOverlayConfig = {
  width: 'self-width',
  positionX: 'left',
  positionY: 'under',
  lockX: false,
  lockY: false,
  gap: 0,
};

@Component({
  selector: 'kudu-overlay',
  imports: [KuduOverlayContentComponent, KuduTeleportDirective],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduOverlayComponent {
  public origin = input.required<KuduOverlayOriginDirective>();
  public config = input<KuduOverlayConfig>(initialConfig);

  public isOpen = model.required<boolean>();

  public positionXChange = output<KuduOverlayPositionX>();
  public positionYChange = output<KuduOverlayPositionY>();

  public byClickOutside = output();

  public onClickOutside() {
    this.byClickOutside.emit();
  }
}
