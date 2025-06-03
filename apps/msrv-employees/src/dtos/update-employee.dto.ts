import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { EmployeeStatus, UpdatableEmployee } from '@kraken/domain';

export class UpdateEmployeeDto
  implements Omit<UpdatableEmployee, 'uuid' | 'name'>
{
  @ApiProperty({ description: 'Status', enum: EmployeeStatus, nullable: false })
  @IsEnum(EmployeeStatus)
  status!: EmployeeStatus;
}
