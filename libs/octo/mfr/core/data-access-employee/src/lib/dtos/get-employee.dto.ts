import { Employee } from '@octo/domain';

export interface GetEmployeeResponseDto {
  statusCode: number;
  data: { employee: Employee };
}
