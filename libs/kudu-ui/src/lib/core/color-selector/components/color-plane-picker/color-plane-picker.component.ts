import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  KuduColorPoint,
  KuduColorPointService,
} from '../../services/color-point.service';

@Component({
  selector: 'kudu-color-plane-picker',
  imports: [],
  templateUrl: './color-plane-picker.component.html',
  styleUrl: './color-plane-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [KuduColorPointService],
})
export class KuduColorPlanePickerComponent {
  private _ = inject(KuduColorPointService)
    .pipe(takeUntilDestroyed())
    .subscribe((point) => this.value.set(point));

  public value = model.required<KuduColorPoint>();
}
