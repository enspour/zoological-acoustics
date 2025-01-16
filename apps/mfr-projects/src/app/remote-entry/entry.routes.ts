import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';

const ProjectsPage = () =>
  import('@kudu/mfr-feature-projects').then((c) => c.ProjectsPageComponent);

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryComponent,
    children: [
      {
        path: '',
        loadComponent: ProjectsPage,
      },
    ],
  },
];
