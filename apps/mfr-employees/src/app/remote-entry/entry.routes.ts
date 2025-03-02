import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';

const EmployeesPage = () =>
  import('@kudu/mfr-feature-employees').then((c) => c.EmployeesPageComponent);

const EmployeePage = () =>
  import('@kudu/mfr-feature-employee').then((c) => c.EmployeePageComponent);

const EmployeeOverview = () =>
  import('@kudu/mfr-feature-employee-overview').then(
    (c) => c.EmployeeOverviewPageComponent,
  );

const EmployeeContacts = () =>
  import('@kudu/mfr-feature-employee-contacts').then(
    (c) => c.EmployeeContactsPageComponent,
  );

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryComponent,
    children: [
      {
        path: '',
        title: 'Kudu | Сотрудники',
        loadComponent: EmployeesPage,
      },
      {
        path: ':employeeUuid',
        loadComponent: EmployeePage,
        children: [
          {
            path: '',
            title: 'Kudu | Сотрудник',
            loadComponent: EmployeeOverview,
          },
          {
            path: 'contacts',
            title: 'Kudu | Контакты',
            loadComponent: EmployeeContacts,
          },
        ],
      },
    ],
  },
];
