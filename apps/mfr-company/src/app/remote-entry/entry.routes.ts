import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';

const CompanyPage = () =>
  import('@kudu/mfr-feature-company').then((c) => c.CompanyPageComponent);

const CompanyOverviewPage = () =>
  import('@kudu/mfr-feature-company-overview').then(
    (c) => c.CompanyOverviewPageComponent,
  );

const CompanyEmployeesPage = () =>
  import('@kudu/mfr-feature-employees').then((c) => c.EmployeesPageComponent);

const CompanyStructurePage = () =>
  import('@kudu/mfr-feature-company-structure').then(
    (c) => c.CompanyStructurePageComponent,
  );

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryComponent,
    children: [
      {
        path: '',
        loadComponent: CompanyPage,
        children: [
          {
            path: '',
            title: 'Kudu | Компания',
            loadComponent: CompanyOverviewPage,
          },
          {
            path: 'employees',
            title: 'Kudu | Сотрудники Компании',
            loadComponent: CompanyEmployeesPage,
          },
          {
            path: 'structure',
            title: 'Kudu | Структура Компании',
            loadComponent: CompanyStructurePage,
          },
        ],
      },
    ],
  },
];
