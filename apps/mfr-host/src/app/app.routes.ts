import { Route } from '@angular/router';

import { AuthGuard, UnAuthGuard } from '@kudu/mfr-util-auth-guard';

const LoginPage = () =>
  import('@kudu/mfr-feature-login').then((c) => c.LoginPageComponent);

const SignupPage = () =>
  import('@kudu/mfr-feature-signup').then((c) => c.SignupPageComponent);

const SidebarLayout = () =>
  import('@kudu/mfr-feature-sidebar').then((c) => c.LayoutComponent);

const HomePage = () =>
  import('@kudu/mfr-feature-home').then((c) => c.HomePageComponent);

const EmployeesPages = () =>
  import('@kudu/mfr-employees/Routes').then((m) => m!.remoteRoutes);

export const appRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [UnAuthGuard],
    loadComponent: LoginPage,
  },
  {
    path: 'signup',
    canActivate: [UnAuthGuard],
    loadComponent: SignupPage,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: SidebarLayout,
    children: [
      {
        path: '',
        loadComponent: HomePage,
      },
      {
        path: 'employees',
        loadChildren: EmployeesPages,
      },
    ],
  },
];
