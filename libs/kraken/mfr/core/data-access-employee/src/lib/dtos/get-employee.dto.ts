import { Employee } from '@kraken/domain';

export interface GetEmployeeResponseDto {
  statusCode: number;
  data: { employee: Employee };
}
