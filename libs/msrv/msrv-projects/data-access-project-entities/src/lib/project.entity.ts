import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Project } from '@kudu/domain';

import { ProjectToDataFieldEntity } from './project-to-data-field.entity';

@Entity()
export class ProjectEntity implements Project {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  name!: string;

  @OneToMany(() => ProjectToDataFieldEntity, (entity) => entity.project)
  dfs!: ProjectToDataFieldEntity[];

  @Column('uuid')
  createdByUuid!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: string;
}
