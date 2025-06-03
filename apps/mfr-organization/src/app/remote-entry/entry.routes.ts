import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';

const EmployeesPage = () =>
  import('@kraken/mfr-feature-employees').then((c) => c.EmployeesPageComponent);

const EmployeePage = () =>
  import('@kraken/mfr-feature-employee').then((c) => c.EmployeePageComponent);

const EmployeeOverview = () =>
  import('@kraken/mfr-feature-employee-overview').then(
    (c) => c.EmployeeOverviewPageComponent,
  );

const EmployeeContacts = () =>
  import('@kraken/mfr-feature-employee-contacts').then(
    (c) => c.EmployeeContactsPageComponent,
  );

const OrganizationPage = () =>
  import('@kraken/mfr-feature-organization').then(
    (c) => c.OrganizationPageComponent,
  );

const OrganizationOverviewPage = () =>
  import('@kraken/mfr-feature-organization-overview').then(
    (c) => c.OrganizationOverviewPageComponent,
  );

const OrganizationStructurePage = () =>
  import('@kraken/mfr-feature-organization-structure').then(
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
            title: 'Octo | Компания',
            loadComponent: OrganizationOverviewPage,
          },
          {
            path: 'employees',
            title: 'Octo | Сотрудники Компании',
            loadComponent: EmployeesPage,
          },
          {
            path: 'structure',
            title: 'Octo | Структура Компании',
            loadComponent: OrganizationStructurePage,
          },
        ],
      },
      {
        path: 'employees/:employeeUuid',
        title: 'Octo | Сотрудник Компании',
        loadComponent: EmployeePage,
        children: [
          {
            path: '',
            title: 'Octo | Сотрудник',
            loadComponent: EmployeeOverview,
          },
          {
            path: 'contacts',
            title: 'Octo | Контакты',
            loadComponent: EmployeeContacts,
          },
        ],
      },
    ],
  },
];
