import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';

import { kanbanBoardRedirectGuard } from '@kudu/mfr-util-kanban-last-board';

const ProjectsPage = () =>
  import('@kudu/mfr-feature-projects').then((c) => c.ProjectsPageComponent);

const ProjectsSettingsPage = () =>
  import('@kudu/mfr-feature-projects-settings').then(
    (c) => c.ProjectsSettingsPageComponent,
  );

const ProjectsDataFieldsPage = () =>
  import('@kudu/mfr-feature-projects-data-fields').then(
    (c) => c.ProjectsDataFieldsPageComponent,
  );

const ProjectPage = () =>
  import('@kudu/mfr-feature-project').then((c) => c.ProjectPageComponent);

const ProjectSettingsPage = () =>
  import('@kudu/mfr-feature-project-settings').then(
    (c) => c.ProjectSettingsPageComponent,
  );

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
        path: 'settings',
        title: 'Kudu | Настройки проектов',
        loadComponent: ProjectsSettingsPage,
        children: [
          {
            path: 'data-fields',
            title: 'Kudu | Дополнительные поля',
            loadComponent: ProjectsDataFieldsPage,
          },
        ],
      },
      {
        path: ':projectUuid',
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
            canActivate: [kanbanBoardRedirectGuard],
          },
          {
            path: 'kanban/board/:boardUuid',
            title: 'Kudu | Доски',
            loadComponent: KanbanPage,
          },
          {
            path: 'settings',
            title: 'Kudu | Настройки',
            loadComponent: ProjectSettingsPage,
          },
        ],
      },
    ],
  },
];
