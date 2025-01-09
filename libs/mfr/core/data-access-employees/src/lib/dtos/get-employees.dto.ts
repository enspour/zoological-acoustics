import { Employee } from '@kudu/domain';

export interface GetEmployeesResponseDto {
  statusCode: number;
  data: {
    employees: Employee[];
  };
}
