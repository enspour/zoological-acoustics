import { Route } from '@angular/router';

import { AuthGuard, UnAuthGuard } from '@kudu/mfr-util-auth-guard';

const LoginPage = () =>
  import('@kudu/mfr-feature-login').then((c) => c.LoginPageComponent);

const SignupPage = () =>
  import('@kudu/mfr-feature-signup').then((c) => c.SignupPageComponent);

const AuthLayout = () =>
  import('@kudu/mfr-feature-auth-layout').then((c) => c.LayoutComponent);

const HomePage = () =>
  import('@kudu/mfr-feature-home').then((c) => c.HomePageComponent);

const EmployeesPages = () =>
  import('@kudu/mfr-employees/Routes').then((m) => m.remoteRoutes);

const ProjectsPages = () =>
  import('@kudu/mfr-projects/Routes').then((m) => m.remoteRoutes);

export const appRoutes: Route[] = [
  {
    path: 'login',
    title: 'Kudu | Login',
    canActivate: [UnAuthGuard],
    loadComponent: LoginPage,
  },
  {
    path: 'signup',
    title: 'Kudu | Signup',
    canActivate: [UnAuthGuard],
    loadComponent: SignupPage,
  },
  {
    path: '',
    title: 'Kudu',
    canActivate: [AuthGuard],
    loadComponent: AuthLayout,
    children: [
      {
        path: '',
        loadComponent: HomePage,
      },
      {
        path: 'employees',
        loadChildren: EmployeesPages,
      },
      {
        path: 'projects',
        loadChildren: ProjectsPages,
      },
    ],
  },
];
