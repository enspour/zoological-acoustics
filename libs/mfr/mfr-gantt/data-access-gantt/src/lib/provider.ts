import { GanttChartService } from './gantt-chart.service';
import { GanttSidebarService } from './gantt-sidebar.service';
import { GanttTimelineService } from './gantt-timeline.service';
import { GanttToolbarService } from './gantt-toolbar.service';
import { GanttService } from './gantt.service';

export const provideGanttDataAccess = () => [
  GanttService,
  GanttChartService,
  GanttSidebarService,
  GanttTimelineService,
  GanttToolbarService,
];
