import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideProjectsDataAccess } from '@kudu/data-access-projects';
import { provideAuthDataAccess } from '@kudu/mfr-data-access-auth';
import { provideEmployeesDataAccess } from '@kudu/mfr-data-access-employees';
import { provideUserDataAccess } from '@kudu/mfr-data-access-user';
import { provideExplorer } from '@kudu/mfr-feature-explorer';
import { AuthInterceptor } from '@kudu/mfr-util-auth-interceptor';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    provideExplorer(),
    provideAuthDataAccess(),
    provideUserDataAccess(),
    provideEmployeesDataAccess(),
    provideProjectsDataAccess(),

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
};
