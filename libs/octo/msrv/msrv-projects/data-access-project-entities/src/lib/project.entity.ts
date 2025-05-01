import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Project } from '@octo/domain';

import { ProjectToDataValueEntity } from './project-to-data-value.entity';
import { ProjectToMemberEntity } from './project-to-member.entity';

@Entity()
export class ProjectEntity implements Project {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  name!: string;

  @OneToMany(() => ProjectToMemberEntity, (entity) => entity.project, {
    cascade: true,
  })
  members!: ProjectToMemberEntity[];

  @OneToMany(() => ProjectToDataValueEntity, (entity) => entity.project, {
    cascade: true,
  })
  dataValues!: ProjectToDataValueEntity[];

  @Column('uuid')
  createdByUuid!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: string;
}
