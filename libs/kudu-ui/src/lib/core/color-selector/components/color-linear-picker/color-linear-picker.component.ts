import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { KuduColorPointService } from '../../services/color-point.service';

@Component({
  selector: 'kudu-color-linear-picker',
  imports: [],
  templateUrl: './color-linear-picker.component.html',
  styleUrl: './color-linear-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [KuduColorPointService],
})
export class KuduColorLinearPickerComponent {
  private _ = inject(KuduColorPointService)
    .pipe(takeUntilDestroyed())
    .subscribe((point) => this.value.set(point.x));

  public value = model.required<number>();
}
