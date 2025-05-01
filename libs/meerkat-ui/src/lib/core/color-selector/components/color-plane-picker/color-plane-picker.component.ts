import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  MkColorPoint,
  MkColorPointService,
} from '../../services/color-point.service';

@Component({
  selector: 'mk-color-plane-picker',
  imports: [],
  templateUrl: './color-plane-picker.component.html',
  styleUrl: './color-plane-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MkColorPointService],
})
export class MkColorPlanePickerComponent {
  private _ = inject(MkColorPointService)
    .pipe(takeUntilDestroyed())
    .subscribe((point) => this.value.set(point));

  public value = model.required<MkColorPoint>();
}
