import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

import { KuduClickOutsideDirective } from '../../../click-outside';
import { KuduTeleportDirective } from '../../../teleports';

import { KuduOverlayOriginDirective } from '../../directives/overlay-origin.directive';
import { KuduOverlayContentComponent } from '../overlay-content/overlay-content.component';

import { KuduOverlayConfig, KuduOverlayPlacement } from '../../interfaces';

const initialConfig: Required<KuduOverlayConfig> = {
  width: 'self-width',
  placement: 'bottom-left',
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

  public placementChange = output<KuduOverlayPlacement>();

  public byClickOutside = output<Event>();

  public onClickOutside(event: Event) {
    this.byClickOutside.emit(event);
  }
}
