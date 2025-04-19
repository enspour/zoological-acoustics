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

import { KuduOverlayConfig, KuduOverlayPosition } from '../../interfaces';

const initialConfig: Required<KuduOverlayConfig> = {
  width: 'self-width',
  position: 'under-left',
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

  public positionChange = output<KuduOverlayPosition>();

  public byClickOutside = output<Event>();

  public onClickOutside(event: Event) {
    this.byClickOutside.emit(event);
  }
}
