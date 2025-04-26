import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  model,
} from '@angular/core';

import { createMemoizedSignal } from '@kudu-ng-utils';

import { KuduColorPoint } from '../../services/color-point.service';

import { KuduColorLinearPickerComponent } from '../color-linear-picker/color-linear-picker.component';
import { KuduColorPlanePickerComponent } from '../color-plane-picker/color-plane-picker.component';

import { kuduHexToHsv, kuduHsvToHex } from '../../utils';

import { KuduColorHsv } from '../../interfaces';

@Component({
  selector: 'kudu-color-picker',
  imports: [KuduColorLinearPickerComponent, KuduColorPlanePickerComponent],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduColorPickerComponent {
  public color = model.required<string>();

  public hsv = createMemoizedSignal(this.color, kuduHexToHsv);

  public point = computed(() => ({
    x: this.hsv.value().s / 100,
    y: -this.hsv.value().v / 100 + 1,
  }));

  @HostBinding('style.--kudu-color-picker-color')
  public get Color() {
    return this.color();
  }

  @HostBinding('style.--kudu-color-picker-hue')
  public get Hue() {
    return this.hsv.value().h;
  }

  public onPlanePointChange(point: KuduColorPoint) {
    const { h, a } = this.hsv.value();

    const s = point.x * 100;
    const v = (1 - point.y) * 100;

    this.updateColor({ h, s, v, a });
  }

  public onHuePointChange(value: number) {
    const { s, v, a } = this.hsv.value();

    const h = Math.floor(value * 360);

    this.updateColor({ h, s, v, a });
  }

  public onAlphaPointChange(value: number) {
    const { h, s, v } = this.hsv.value();
    this.updateColor({ h, s, v, a: value });
  }

  private updateColor(hsv: KuduColorHsv) {
    const hex = kuduHsvToHex(hsv);

    this.hsv.setMemo(hex, hsv);
    this.color.set(hex);
  }
}
