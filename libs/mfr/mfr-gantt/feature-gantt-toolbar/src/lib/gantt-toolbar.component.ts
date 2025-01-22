import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ZoomContainerComponent } from './components/zoom-container/zoom-container.component';

@Component({
  selector: 'lib-gantt-toolbar',
  imports: [ZoomContainerComponent],
  templateUrl: './gantt-toolbar.component.html',
  styleUrl: './gantt-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttToolbarComponent {}
