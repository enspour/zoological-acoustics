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

const ProjectOverviewPage = () =>
  import('@kudu/mfr-feature-project-overview').then(
    (c) => c.ProjectOverviewPageComponent,
  );

const ProjectMyTasksPage = () =>
  import('@kudu/mfr-feature-project-my-tasks').then(
    (c) => c.ProjectMyTasksPageComponent,
  );

const ProjectTablePage = () =>
  import('@kudu/mfr-feature-project-table').then(
    (c) => c.ProjectTablePageComponent,
  );

const ProjectSettingsPage = () =>
  import('@kudu/mfr-feature-project-settings').then(
    (c) => c.ProjectSettingsPageComponent,
  );

const ProjectSettingsGeneralPage = () =>
  import('@kudu/mfr-feature-project-settings-general').then(
    (c) => c.ProjectSettingsGeneralPageComponent,
  );

const ProjectSettingsAccessPage = () =>
  import('@kudu/mfr-feature-project-settings-access').then(
    (c) => c.ProjectSettingsAccessPageComponent,
  );

const ProjectSettingsBoardsPage = () =>
  import('@kudu/mfr-feature-project-settings-boards').then(
    (c) => c.ProjectSettingsBoardsPageComponent,
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
            path: '',
            title: 'Kudu | Проект',
            loadComponent: ProjectOverviewPage,
          },
          {
            path: 'my-tasks',
            title: 'Kudu | Мои задачи',
            loadComponent: ProjectMyTasksPage,
          },
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
            path: 'table',
            title: 'Kudu | Таблица',
            loadComponent: ProjectTablePage,
          },
          {
            path: 'settings',
            title: 'Kudu | Настройки',
            loadComponent: ProjectSettingsPage,
            children: [
              {
                path: '',
                title: 'Kudu | Общие',
                loadComponent: ProjectSettingsGeneralPage,
              },
              {
                path: 'access',
                title: 'Kudu | Доступ',
                loadComponent: ProjectSettingsAccessPage,
              },
              {
                path: 'boards',
                title: 'Kudu | Доски',
                loadComponent: ProjectSettingsBoardsPage,
              },
            ],
          },
        ],
      },
    ],
  },
];
