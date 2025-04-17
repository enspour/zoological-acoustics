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

const OrganizationPage = () =>
  import('@kudu/mfr-feature-organization').then(
    (c) => c.OrganizationPageComponent,
  );

const OrganizationOverviewPage = () =>
  import('@kudu/mfr-feature-organization-overview').then(
    (c) => c.OrganizationOverviewPageComponent,
  );

const OrganizationStructurePage = () =>
  import('@kudu/mfr-feature-organization-structure').then(
    (c) => c.OrganizationStructurePageComponent,
  );

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryComponent,
    children: [
      {
        path: '',
        loadComponent: OrganizationPage,
        children: [
          {
            path: '',
            title: 'Kudu | Компания',
            loadComponent: OrganizationOverviewPage,
          },
          {
            path: 'employees',
            title: 'Kudu | Сотрудники Компании',
            loadComponent: EmployeesPage,
          },
          {
            path: 'structure',
            title: 'Kudu | Структура Компании',
            loadComponent: OrganizationStructurePage,
          },
        ],
      },
      {
        path: 'employees/:employeeUuid',
        title: 'Kudu | Сотрудник Компании',
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
