import { EmployeesApi } from './employees.api';
import { EmployeesService } from './employees.service';

export const provideEmployeesDataAccess = () => [
  EmployeesApi,
  EmployeesService,
];
