import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';

const IntegrationsPage = () =>
  import('@kudu/mfr-feature-integrations').then(
    (c) => c.IntegrationsPageComponent,
  );

const IntegrationPage = () =>
  import('@kudu/mfr-feature-integration').then(
    (c) => c.IntegrationPageComponent,
  );

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryComponent,
    children: [
      {
        path: '',
        loadComponent: IntegrationsPage,
      },
      {
        path: ':uuid',
        loadComponent: IntegrationPage,
      },
    ],
  },
];
