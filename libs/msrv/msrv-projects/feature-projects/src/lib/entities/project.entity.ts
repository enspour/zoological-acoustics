import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Project } from '@kudu/domain';

@Entity()
export class ProjectEntity implements Project {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  name!: string;
}
