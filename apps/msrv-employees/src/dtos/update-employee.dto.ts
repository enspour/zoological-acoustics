import { ApiProperty } from '@nestjs/swagger';

import { EmployeeStatus, UpdatableEmployee } from '@kudu/domain';

export class UpdateEmployeeDto implements Omit<UpdatableEmployee, 'uuid'> {
  @ApiProperty({ description: 'Name', nullable: false })
  name!: string;

  @ApiProperty({ description: 'Status', enum: EmployeeStatus, nullable: false })
  status!: EmployeeStatus;

  @ApiProperty({ description: 'Date Of Employment', nullable: true })
  dateOfEmployment!: Date | null;

  @ApiProperty({ description: 'Date Of Dismissal', nullable: true })
  dateOfDismissal!: Date | null;
}
