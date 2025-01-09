import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';

const EmployeesPage = () =>
  import('@kudu/mfr-feature-employees').then((c) => c.EmployeesPageComponent);

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryComponent,
    children: [
      {
        path: '',
        loadComponent: EmployeesPage,
      },
    ],
  },
];
