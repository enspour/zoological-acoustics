import { Employee } from '@kraken/domain';

export interface GetEmployeesResponseDto {
  statusCode: number;
  data: {
    employees: Employee[];
  };
}
