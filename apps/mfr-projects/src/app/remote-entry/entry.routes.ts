import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';

const ProjectsPage = () =>
  import('@kudu/mfr-feature-projects').then((c) => c.ProjectsPageComponent);

const ProjectPage = () =>
  import('@kudu/mfr-feature-project').then((c) => c.ProjectPageComponent);

const GanttPage = () =>
  import('@kudu/mfr-feature-gantt').then((c) => c.GanttPageComponent);

const KanbanPage = () =>
  import('@kudu/mfr-feature-kanban').then((c) => c.KanbanPageComponent);

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryComponent,
    children: [
      {
        path: '',
        loadComponent: ProjectsPage,
      },
      {
        path: ':uuid',
        loadComponent: ProjectPage,
        children: [
          {
            path: 'gantt',
            loadComponent: GanttPage,
          },
          {
            path: 'kanban',
            loadComponent: KanbanPage,
          },
        ],
      },
    ],
  },
];
