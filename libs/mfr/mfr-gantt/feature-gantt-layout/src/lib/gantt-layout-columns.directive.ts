import { computed, Directive, ElementRef, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { resizeObservable } from '@kudu-ng-utils';

import {
  GanttTimelineService,
  GanttToolbarService,
} from '@kudu/mfr-data-access-gantt';

const MIN_COLUMN_WIDTH = {
  days: 27,
  weeks: 12,
  months: 5,
  quarter: 2,
  years: 1,
};

@Directive({
  selector: '[libGanttLayoutColumns]',
  exportAs: 'libGanttLayoutColumns',
})
export class GanttLayoutColumnsDirective {
  private ganttToolbarService = inject(GanttToolbarService);
  private ganttTimelineService = inject(GanttTimelineService);

  public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public elementWidth = toSignal(
    resizeObservable(this.elementRef).pipe(
      map((entry) => entry.contentRect.width),
    ),
  );

  public columnWidth = computed(() => this.getColumnWidth());
  public columnCount = computed(() => this.getColumnCount());

  public width = computed(() => this.getWidth());

  private getColumnWidth() {
    const zoom = this.ganttToolbarService.zoom();

    const minWidth = MIN_COLUMN_WIDTH[zoom];
    const elementWidth = this.elementWidth();

    if (elementWidth && elementWidth > minWidth * this.columnCount()) {
      return elementWidth / this.columnCount();
    }

    return minWidth;
  }

  private getColumnCount() {
    return this.ganttTimelineService.dates().length;
  }

  private getWidth() {
    return this.columnCount() * this.columnWidth();
  }
}
