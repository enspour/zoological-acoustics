import { EmployeeApi } from './employee.api';
import { EmployeeService } from './employee.service';

export const provideEmployeeDataAccess = () => [EmployeeApi, EmployeeService];
