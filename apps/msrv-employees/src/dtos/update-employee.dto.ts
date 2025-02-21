import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum } from 'class-validator';

import { EmployeeStatus, UpdatableEmployee } from '@kudu/domain';

export class UpdateEmployeeDto
  implements Omit<UpdatableEmployee, 'uuid' | 'name'>
{
  @ApiProperty({ description: 'Status', enum: EmployeeStatus, nullable: false })
  @IsEnum(EmployeeStatus)
  status!: EmployeeStatus;

  @ApiProperty({ description: 'Date Of Employment', nullable: true })
  @IsDateString()
  dateOfEmployment!: string | null;

  @ApiProperty({ description: 'Date Of Dismissal', nullable: true })
  @IsDateString()
  dateOfDismissal!: string | null;
}
