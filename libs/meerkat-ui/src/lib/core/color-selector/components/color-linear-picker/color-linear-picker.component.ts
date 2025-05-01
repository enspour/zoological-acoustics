import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MkColorPointService } from '../../services/color-point.service';

@Component({
  selector: 'mk-color-linear-picker',
  imports: [],
  templateUrl: './color-linear-picker.component.html',
  styleUrl: './color-linear-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MkColorPointService],
})
export class MkColorLinearPickerComponent {
  private _ = inject(MkColorPointService)
    .pipe(takeUntilDestroyed())
    .subscribe((point) => this.value.set(point.x));

  public value = model.required<number>();
}
