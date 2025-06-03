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

import { KongAuthInterceptor, provideKongAuthDataAccess } from '@kong-ng';

import { provideEmployeeDataAccess } from '@kraken/mfr-data-access-employee';
import { provideEmployeesDataAccess } from '@kraken/mfr-data-access-employees';
import { provideProjectDataAccess } from '@kraken/mfr-data-access-project';
import { provideProjectsDataAccess } from '@kraken/mfr-data-access-projects';
import { provideProjectDataFieldsDataAccess } from '@kraken/mfr-data-access-projects-data-fields';
import { provideTaskBoardsDataAccess } from '@kraken/mfr-data-access-task-boards';
import { provideTaskColumnsDataAccess } from '@kraken/mfr-data-access-task-columns';
import { provideTasksDataAccess } from '@kraken/mfr-data-access-tasks';
import { provideUserDataAccess } from '@kraken/mfr-data-access-user';

import { provideExplorer } from '@kraken/mfr-feature-explorer';

import { appRoutes } from './app.routes';

registerLocaleData(localeRu);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    provideExplorer(),
    provideKongAuthDataAccess(),
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
    { provide: HTTP_INTERCEPTORS, useClass: KongAuthInterceptor, multi: true },
  ],
};
