import { registerLocaleData } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideAuthDataAccess } from '@kudu/mfr-data-access-auth';
import { provideEmployeeDataAccess } from '@kudu/mfr-data-access-employee';
import { provideEmployeesDataAccess } from '@kudu/mfr-data-access-employees';
import { provideProjectDataAccess } from '@kudu/mfr-data-access-project';
import { provideProjectsDataAccess } from '@kudu/mfr-data-access-projects';
import { provideProjectDataFieldsDataAccess } from '@kudu/mfr-data-access-projects-data-fields';
import { provideTaskBoardsDataAccess } from '@kudu/mfr-data-access-task-boards';
import { provideTaskColumnsDataAccess } from '@kudu/mfr-data-access-task-columns';
import { provideTasksDataAccess } from '@kudu/mfr-data-access-tasks';
import { provideUserDataAccess } from '@kudu/mfr-data-access-user';

import { provideExplorer } from '@kudu/mfr-feature-explorer';

import { AuthInterceptor } from '@kudu/mfr-util-auth-interceptor';

import { appRoutes } from './app.routes';

registerLocaleData(localeRu);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    provideExplorer(),
    provideAuthDataAccess(),
    provideUserDataAccess(),
    provideEmployeesDataAccess(),
    provideEmployeeDataAccess(),
    provideProjectsDataAccess(),
    provideProjectDataAccess(),
    provideProjectDataFieldsDataAccess(),
    provideTasksDataAccess(),
    provideTaskColumnsDataAccess(),
    provideTaskBoardsDataAccess(),

    { provide: LOCALE_ID, useValue: 'ru-RU' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
};
