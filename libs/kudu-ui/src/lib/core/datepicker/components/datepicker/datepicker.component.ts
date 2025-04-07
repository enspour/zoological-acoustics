import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
} from '@angular/core';

import { KuduCalendarComponent } from '../../../calendar';
import { KuduClickOutsideDirective } from '../../../click-outside';
import { KuduIconComponent } from '../../../icon';
import {
  KuduInputContainerComponent,
  KuduInputDateComponent,
} from '../../../input';
import {
  KuduOverlayComponent,
  KuduOverlayConfig,
  KuduOverlayOriginDirective,
} from '../../../overlay';

@Component({
  selector: 'kudu-datepicker',
  imports: [
    KuduIconComponent,
    KuduCalendarComponent,
    KuduOverlayComponent,
    KuduInputContainerComponent,
    KuduInputDateComponent,
  ],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [KuduClickOutsideDirective, KuduOverlayOriginDirective],
})
export class KuduDatepickerComponent {
  public origin = inject(KuduOverlayOriginDirective);

  public date = model<Date | number | string>();

  public isOpen = model(false);

  public placeholder = input<string>();

  public config: KuduOverlayConfig = {
    width: 'self-width',
    positionX: 'left',
    positionY: 'under',
    lockX: false,
    lockY: false,
    gap: 4,
  };

  public onToggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  public onOpen() {
    this.isOpen.set(true);
  }

  public onClose() {
    this.isOpen.set(false);
  }

  public onReset() {
    this.date.set(undefined);
  }
}
