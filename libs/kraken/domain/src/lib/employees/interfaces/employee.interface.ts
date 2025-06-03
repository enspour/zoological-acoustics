import { User } from '../../users';

export enum EmployeeStatus {
  WORKING = 'working',
  FIRED = 'fired',
}

export type Employee = User & {
  status: EmployeeStatus;
};

export type UpdatableEmployee = Omit<Employee, 'name'>;
