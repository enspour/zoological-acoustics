import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { KuduActiveZoneDirective } from '../../../active-zone';
import { KuduOverlayOriginDirective } from '../../../overlay';
import { kuduSize } from '../../../size';
import { KuduZoneDirective } from '../../../zone';

@Component({
  selector: 'kudu-input-container',
  imports: [],
  templateUrl: './input-container.component.html',
  styleUrl: './input-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    KuduZoneDirective,
    KuduActiveZoneDirective,
    KuduOverlayOriginDirective,
  ],
  host: {
    tabindex: '1',
  },
})
export class KuduInputContainerComponent {
  private size = inject(kuduSize);

  private activeZoneDirective = inject(KuduActiveZoneDirective);

  @HostBinding('class')
  public get Classes() {
    return `
      ${this.size()}
      ${this.activeZoneDirective.active() ? 'focused' : ''}
    `;
  }
}
