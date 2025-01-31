import { computed, Directive, ElementRef, inject, signal } from '@angular/core';

import { GanttChartService } from './gantt-chart.service';

@Directive({
  selector: '[libGanttLayout]',
  exportAs: 'libGanttLayout',
})
export class GanttLayoutDirective {
  private ganttChartService = inject(GanttChartService);

  public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public rowHeight = signal(24);
  public rowCount = computed(() => this.getRowCount());

  public height = computed(() => this.getHeight());

  private getRowCount() {
    return this.ganttChartService.rows().length;
  }

  private getHeight() {
    return this.rowCount() * this.rowHeight();
  }
}
