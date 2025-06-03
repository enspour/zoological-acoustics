import { Column, Entity, PrimaryColumn } from 'typeorm';

import { Employee, EmployeeStatus } from '@kraken/domain';

@Entity()
export class EmployeeEntity implements Employee {
  @PrimaryColumn('uuid')
  uuid!: string;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: EmployeeStatus,
    default: EmployeeStatus.WORKING,
  })
  status!: EmployeeStatus;
}
