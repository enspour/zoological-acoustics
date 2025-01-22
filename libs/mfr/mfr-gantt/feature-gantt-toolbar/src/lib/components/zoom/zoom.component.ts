import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model,
} from '@angular/core';

import { GanttZoom } from '@kudu/mfr-data-access-gantt';

const variants = ['days', 'weeks', 'months', 'quarter', 'years'] as const;

const aliases = {
  days: 'Дни',
  weeks: 'Недели',
  months: 'Месяцы',
  quarter: 'Кварталы',
  years: 'Года',
};

@Component({
  selector: 'lib-zoom',
  imports: [],
  templateUrl: './zoom.component.html',
  styleUrl: './zoom.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoomComponent {
  public variants = variants;
  public aliases = aliases;

  public value = model<GanttZoom>('days');
  public valueIndex = computed(() => this.getValueIndex());

  public text = computed(() => this.aliases[this.value()]);

  public onValueChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const index = Number(target.value);

    if (isNaN(index)) {
      return;
    }

    this.value.set(variants[index]);
  }

  private getValueIndex() {
    return this.variants.findIndex((v) => v === this.value());
  }
}
