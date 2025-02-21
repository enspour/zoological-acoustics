import { computed, Directive, ElementRef, inject, signal } from '@angular/core';

import { GanttRowsService } from '@kudu/mfr-data-access-gantt';

@Directive({
  selector: '[libGanttLayoutRows]',
  exportAs: 'libGanttLayoutRows',
})
export class GanttLayoutRowsDirective {
  private ganttRowsService = inject(GanttRowsService);

  public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public rowHeight = signal(24);
  public rowCount = computed(() => this.getRowCount());

  public height = computed(() => this.getHeight());

  private getRowCount() {
    return this.ganttRowsService.rows().length;
  }

  private getHeight() {
    return this.rowCount() * this.rowHeight();
  }
}
