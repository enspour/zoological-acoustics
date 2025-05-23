import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  linkedSignal,
  model,
} from '@angular/core';

import { createMemoizedSignal } from '@meerkat-ng-utils';

import { MkColorPoint } from '../../services/color-point.service';

import { MkColorLinearPickerComponent } from '../color-linear-picker/color-linear-picker.component';
import { MkColorPlanePickerComponent } from '../color-plane-picker/color-plane-picker.component';

import { mkHexToHsv, mkHsvToHex } from '../../utils';

import { MkColorHsv } from '../../interfaces';

@Component({
  selector: 'mk-color-picker',
  imports: [MkColorLinearPickerComponent, MkColorPlanePickerComponent],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkColorPickerComponent {
  public color = model.required<string>();

  public hsv = createMemoizedSignal(this.color, mkHexToHsv);

  public point = computed(() => ({
    x: this.hsv.value().s / 100,
    y: -this.hsv.value().v / 100 + 1,
  }));

  public hue = linkedSignal<any, number>({
    source: this.hsv.value,
    computation(hsv, prev) {
      return prev && hsv.s === 0 ? prev.value : hsv.h;
    },
  });

  @HostBinding('style.--mk-color-picker-color')
  public get Color() {
    return this.color();
  }

  @HostBinding('style.--mk-color-picker-hue')
  public get Hue() {
    return this.hue();
  }

  public onPlanePointChange(point: MkColorPoint) {
    const { a } = this.hsv.value();

    const h = this.hue();
    const s = point.x * 100;
    const v = (1 - point.y) * 100;

    this.updateColor({ h, s, v, a });
  }

  public onHuePointChange(value: number) {
    const { s, v, a } = this.hsv.value();

    const h = Math.floor(value * 360);
    this.hue.set(h);

    this.updateColor({ h, s, v, a });
  }

  public onAlphaPointChange(value: number) {
    const { s, v } = this.hsv.value();

    const h = this.hue();
    const a = value;

    this.updateColor({ h, s, v, a });
  }

  private updateColor(hsv: MkColorHsv) {
    const hex = mkHsvToHex(hsv);

    this.hsv.setMemo(hex, hsv);
    this.color.set(hex);
  }
}
