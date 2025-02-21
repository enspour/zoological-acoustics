import { GanttRowsService } from './gantt-rows.service';
import { GanttSidebarService } from './gantt-sidebar.service';
import { GanttTimelineService } from './gantt-timeline.service';
import { GanttToolbarService } from './gantt-toolbar.service';

export const provideGanttDataAccess = () => [
  GanttRowsService,
  GanttSidebarService,
  GanttTimelineService,
  GanttToolbarService,
];
