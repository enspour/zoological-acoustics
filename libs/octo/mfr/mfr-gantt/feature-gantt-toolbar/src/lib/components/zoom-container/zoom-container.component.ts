import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GanttToolbarService, GanttZoom } from '@octo/mfr-data-access-gantt';

import { ZoomComponent } from '../zoom/zoom.component';

@Component({
  selector: 'lib-zoom-container',
  imports: [ZoomComponent],
  templateUrl: './zoom-container.component.html',
  styleUrl: './zoom-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoomContainerComponent {
  private ganttToolbarService = inject(GanttToolbarService);

  public zoom = this.ganttToolbarService.zoom;

  public onValueChange(value: GanttZoom) {
    this.ganttToolbarService.setZoom(value);
  }
}
