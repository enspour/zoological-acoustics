import { Route } from '@angular/router';

import { KongAuthGuard, KongUnAuthGuard } from '@kong-ng';

const AuthLayout = () =>
  import('@kraken/mfr-feature-auth-layout').then((c) => c.LayoutComponent);

const LoginPage = () =>
  import('@kraken/mfr-feature-login').then((c) => c.LoginPageComponent);

const SignupPage = () =>
  import('@kraken/mfr-feature-signup').then((c) => c.SignupPageComponent);

const HomePage = () =>
  import('@kraken/mfr-feature-home').then((c) => c.HomePageComponent);

const ProjectsPages = () =>
  import('@kraken/mfr-projects/Routes').then((m) => m.remoteRoutes);

const OrganizationPages = () =>
  import('@kraken/mfr-organization/Routes').then((m) => m.remoteRoutes);

export const appRoutes: Route[] = [
  {
    path: 'login',
    title: 'Octo | Login',
    canActivate: [KongUnAuthGuard],
    loadComponent: LoginPage,
  },
  {
    path: 'signup',
    title: 'Octo | Signup',
    canActivate: [KongUnAuthGuard],
    loadComponent: SignupPage,
  },
  {
    path: '',
    title: 'Octo',
    canActivate: [KongAuthGuard],
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
