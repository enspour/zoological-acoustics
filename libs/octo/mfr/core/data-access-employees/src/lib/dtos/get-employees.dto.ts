import { Employee } from '@octo/domain';

export interface GetEmployeesResponseDto {
  statusCode: number;
  data: {
    employees: Employee[];
  };
}
