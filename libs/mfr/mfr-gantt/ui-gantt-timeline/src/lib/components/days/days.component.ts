import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { GanttTimelineComponent } from '../../gantt-timeline.component';

@Component({
  selector: 'lib-days',
  imports: [],
  templateUrl: './days.component.html',
  styleUrl: './days.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaysComponent {
  public timeline = inject(GanttTimelineComponent);

  public days = computed(() => this.getDays());

  public columnWidth = this.timeline.columnWidth;

  public getDays() {
    return this.timeline.dates().map((date) => date.getDay());
  }
}
