import { Column, Entity, PrimaryColumn } from 'typeorm';

import { EmployeeStatus, ProjectMember } from '@kraken/domain';

@Entity()
export class ProjectMemberEntity implements ProjectMember {
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
