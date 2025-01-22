import { computed, Directive, ElementRef, inject, signal } from '@angular/core';

import { GanttService } from './gantt.service';

@Directive({
  selector: '[libGanttLayout]',
  exportAs: 'libGanttLayout',
})
export class GanttLayoutDirective {
  private ganttService = inject(GanttService);

  public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public rowHeight = signal(24);
  public rowCount = computed(() => this.getRowCount());

  public height = computed(() => this.getHeight());

  private getRowCount() {
    return this.ganttService.tasks().length;
  }

  private getHeight() {
    return this.rowCount() * this.rowHeight();
  }
}
