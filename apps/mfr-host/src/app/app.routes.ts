import { Route } from '@angular/router';

import { AuthGuard, UnAuthGuard } from '@kudu/mfr-util-auth-guard';

const AuthLayout = () =>
  import('@kudu/mfr-feature-auth-layout').then((c) => c.LayoutComponent);

const LoginPage = () =>
  import('@kudu/mfr-feature-login').then((c) => c.LoginPageComponent);

const SignupPage = () =>
  import('@kudu/mfr-feature-signup').then((c) => c.SignupPageComponent);

const HomePage = () =>
  import('@kudu/mfr-feature-home').then((c) => c.HomePageComponent);

const ProjectsPages = () =>
  import('@kudu/mfr-projects/Routes').then((m) => m.remoteRoutes);

const OrganizationPages = () =>
  import('@kudu/mfr-organization/Routes').then((m) => m.remoteRoutes);

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
        path: 'projects',
        loadChildren: ProjectsPages,
      },
      {
        path: 'organization',
        loadChildren: OrganizationPages,
      },
    ],
  },
];
