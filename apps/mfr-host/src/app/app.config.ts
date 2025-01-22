import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideAuthDataAccess } from '@kudu/mfr-data-access-auth';
import { provideEmployeesDataAccess } from '@kudu/mfr-data-access-employees';
import { provideProjectDataAccess } from '@kudu/mfr-data-access-project';
import { provideProjectsDataAccess } from '@kudu/mfr-data-access-projects';
import { provideUserDataAccess } from '@kudu/mfr-data-access-user';

import { provideExplorer } from '@kudu/mfr-feature-explorer';

import { AuthInterceptor } from '@kudu/mfr-util-auth-interceptor';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    provideExplorer(),
    provideAuthDataAccess(),
    provideUserDataAccess(),
    provideEmployeesDataAccess(),
    provideProjectsDataAccess(),
    provideProjectDataAccess(),

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
};
