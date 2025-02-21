import { User } from '../../users';

export enum EmployeeStatus {
  WORKING = 'working',
  FIRED = 'fired',
}

export type Employee = User & {
  status: EmployeeStatus;
  dateOfEmployment: string | null;
  dateOfDismissal: string | null;
};

export type UpdatableEmployee = Omit<Employee, 'name'>;
