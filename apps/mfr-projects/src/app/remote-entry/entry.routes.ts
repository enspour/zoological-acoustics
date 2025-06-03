import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';

import { kanbanBoardRedirectGuard } from '@kraken/mfr-util-kanban-last-board';
import { userRedirectionGuard } from '@kraken/mfr-util-user-redirection';

const ProjectsPage = () =>
  import('@kraken/mfr-feature-projects').then((c) => c.ProjectsPageComponent);

const ProjectsSettingsPage = () =>
  import('@kraken/mfr-feature-projects-settings').then(
    (c) => c.ProjectsSettingsPageComponent,
  );

const ProjectsDataFieldsPage = () =>
  import('@kraken/mfr-feature-projects-data-fields').then(
    (c) => c.ProjectsDataFieldsPageComponent,
  );

const ProjectPage = () =>
  import('@kraken/mfr-feature-project').then((c) => c.ProjectPageComponent);

const ProjectOverviewPage = () =>
  import('@kraken/mfr-feature-project-overview').then(
    (c) => c.ProjectOverviewPageComponent,
  );

const ProjectSettingsPage = () =>
  import('@kraken/mfr-feature-project-settings').then(
    (c) => c.ProjectSettingsPageComponent,
  );

const ProjectSettingsGeneralPage = () =>
  import('@kraken/mfr-feature-project-settings-general').then(
    (c) => c.ProjectSettingsGeneralPageComponent,
  );

const ProjectSettingsAccessPage = () =>
  import('@kraken/mfr-feature-project-settings-access').then(
    (c) => c.ProjectSettingsAccessPageComponent,
  );

const ProjectSettingsBoardsPage = () =>
  import('@kraken/mfr-feature-project-settings-boards').then(
    (c) => c.ProjectSettingsBoardsPageComponent,
  );

const TasksPage = () =>
  import('@kraken/mfr-feature-tasks').then((c) => c.TasksPageComponent);

const GanttPage = () =>
  import('@kraken/mfr-feature-gantt').then((c) => c.GanttPageComponent);

const KanbanPage = () =>
  import('@kraken/mfr-feature-kanban').then((c) => c.KanbanPageComponent);

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryComponent,
    children: [
      {
        path: '',
        title: 'Octo | Проекты',
        loadComponent: ProjectsPage,
      },
      {
        path: 'settings',
        title: 'Octo | Настройки проектов',
        loadComponent: ProjectsSettingsPage,
        children: [
          {
            path: 'data-fields',
            title: 'Octo | Дополнительные поля',
            loadComponent: ProjectsDataFieldsPage,
          },
        ],
      },
      {
        path: ':projectUuid',
        title: 'Octo | Проект',
        loadComponent: ProjectPage,
        children: [
          {
            path: '',
            title: 'Octo | Проект',
            loadComponent: ProjectOverviewPage,
          },
          {
            path: 'tasks',
            title: 'Octo | Мои задачи',
            loadComponent: TasksPage,
            canActivate: [userRedirectionGuard],
          },
          {
            path: 'tasks/:user',
            title: 'Octo | Мои задачи',
            loadComponent: TasksPage,
          },
          {
            path: 'gantt',
            title: 'Octo | Диаграмма',
            loadComponent: GanttPage,
          },
          {
            path: 'kanban',
            title: 'Octo | Доски',
            loadComponent: KanbanPage,
            canActivate: [kanbanBoardRedirectGuard],
          },
          {
            path: 'kanban/board/:boardUuid',
            title: 'Octo | Доски',
            loadComponent: KanbanPage,
          },
          {
            path: 'table',
            title: 'Octo | Таблица',
            loadComponent: TasksPage,
          },
          {
            path: 'settings',
            title: 'Octo | Настройки',
            loadComponent: ProjectSettingsPage,
            children: [
              {
                path: '',
                title: 'Octo | Общие',
                loadComponent: ProjectSettingsGeneralPage,
              },
              {
                path: 'access',
                title: 'Octo | Доступ',
                loadComponent: ProjectSettingsAccessPage,
              },
              {
                path: 'boards',
                title: 'Octo | Доски',
                loadComponent: ProjectSettingsBoardsPage,
              },
            ],
          },
        ],
      },
    ],
  },
];
