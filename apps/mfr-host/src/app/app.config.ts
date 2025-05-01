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

import { AuthInterceptor, provideAuthDataAccess } from '@kong-ng';

import { provideEmployeeDataAccess } from '@octo/mfr-data-access-employee';
import { provideEmployeesDataAccess } from '@octo/mfr-data-access-employees';
import { provideProjectDataAccess } from '@octo/mfr-data-access-project';
import { provideProjectsDataAccess } from '@octo/mfr-data-access-projects';
import { provideProjectDataFieldsDataAccess } from '@octo/mfr-data-access-projects-data-fields';
import { provideTaskBoardsDataAccess } from '@octo/mfr-data-access-task-boards';
import { provideTaskColumnsDataAccess } from '@octo/mfr-data-access-task-columns';
import { provideTasksDataAccess } from '@octo/mfr-data-access-tasks';
import { provideUserDataAccess } from '@octo/mfr-data-access-user';

import { provideExplorer } from '@octo/mfr-feature-explorer';

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
