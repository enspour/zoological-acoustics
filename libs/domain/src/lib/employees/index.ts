import { User } from '../users';

export enum EmployeeStatus {
  WORKING = 'working',
  FIRED = 'fired',
}

export type Employee = User & {
  status: EmployeeStatus;
  dateOfEmployment: Date | null;
  dateOfDismissal: Date | null;
};

export type UpdatableEmployee = Employee;
