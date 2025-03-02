import { Employee } from '@kudu/domain';

export interface GetEmployeeResponseDto {
  statusCode: number;
  data: { employee: Employee };
}
