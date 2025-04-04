import { ProjectDataField, ProjectDataValue } from '@kudu/domain';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { ProjectDataFieldEntity } from './project-data-field.entity';
import { ProjectDataValueEntity } from './project-data-value.entity';
import { ProjectEntity } from './project.entity';

@Entity()
export class ProjectToDataFieldEntity {
  @PrimaryColumn()
  projectUuid!: string;

  @ManyToOne(() => ProjectEntity, { onDelete: 'CASCADE' })
  project!: ProjectEntity;

  @PrimaryColumn()
  fieldUuid!: string;

  @OneToOne(() => ProjectDataFieldEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  field!: ProjectDataField;

  @PrimaryColumn()
  valueUuid!: string;

  @OneToOne(() => ProjectDataValueEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  value!: ProjectDataValue;
}
