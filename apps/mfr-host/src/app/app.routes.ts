import { Route } from '@angular/router';

import { AuthGuard, UnAuthGuard } from '@octo/mfr-util-auth-guard';

const AuthLayout = () =>
  import('@octo/mfr-feature-auth-layout').then((c) => c.LayoutComponent);

const LoginPage = () =>
  import('@octo/mfr-feature-login').then((c) => c.LoginPageComponent);

const SignupPage = () =>
  import('@octo/mfr-feature-signup').then((c) => c.SignupPageComponent);

const HomePage = () =>
  import('@octo/mfr-feature-home').then((c) => c.HomePageComponent);

const ProjectsPages = () =>
  import('@octo/mfr-projects/Routes').then((m) => m.remoteRoutes);

const OrganizationPages = () =>
  import('@octo/mfr-organization/Routes').then((m) => m.remoteRoutes);

export const appRoutes: Route[] = [
  {
    path: 'login',
    title: 'Octo | Login',
    canActivate: [UnAuthGuard],
    loadComponent: LoginPage,
  },
  {
    path: 'signup',
    title: 'Octo | Signup',
    canActivate: [UnAuthGuard],
    loadComponent: SignupPage,
  },
  {
    path: '',
    title: 'Octo',
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
