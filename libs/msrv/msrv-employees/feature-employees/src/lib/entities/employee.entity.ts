import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Employee, EmployeeStatus } from '@kudu/domain';

@Entity()
export class EmployeeEntity implements Employee {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: EmployeeStatus,
    default: EmployeeStatus.WORKING,
  })
  status!: EmployeeStatus;

  @Column({ type: 'timestamptz', default: null })
  dateOfEmployment!: string | null;

  @Column({ type: 'timestamptz', default: null })
  dateOfDismissal!: string | null;
}
