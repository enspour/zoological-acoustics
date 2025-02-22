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
        title: 'Kudu | Проекты',
        loadComponent: ProjectsPage,
      },
      {
        path: ':uuid',
        title: 'Kudu | Проект',
        loadComponent: ProjectPage,
        children: [
          {
            path: 'gantt',
            title: 'Kudu | Диаграмма',
            loadComponent: GanttPage,
          },
          {
            path: 'kanban',
            title: 'Kudu | Доски',
            loadComponent: KanbanPage,
          },
        ],
      },
    ],
  },
];
