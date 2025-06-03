import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { ProjectDataValue } from '@kraken/domain';

import { ProjectDataValueEntity } from './project-data-value.entity';
import { ProjectEntity } from './project.entity';

@Entity()
export class ProjectToDataValueEntity {
  @PrimaryColumn()
  projectUuid!: string;

  @ManyToOne(() => ProjectEntity, { onDelete: 'CASCADE' })
  project!: ProjectEntity;

  @PrimaryColumn()
  valueUuid!: string;

  @ManyToOne(() => ProjectDataValueEntity, { onDelete: 'CASCADE' })
  value!: ProjectDataValue;
}
