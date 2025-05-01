import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProjectDataField, ProjectDataFieldType } from '@octo/domain';

import { ProjectDataValueEntity } from './project-data-value.entity';

@Entity()
export class ProjectDataFieldEntity implements ProjectDataField {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  name!: string;

  @Column({ type: 'enum', enum: ProjectDataFieldType })
  type!: ProjectDataFieldType;

  @OneToMany(() => ProjectDataValueEntity, (value) => value.field)
  values!: ProjectDataValueEntity[];
}
