import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProjectDataValue } from '@kraken/domain';

import { ProjectDataFieldEntity } from './project-data-field.entity';

@Entity()
export class ProjectDataValueEntity implements ProjectDataValue {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  value!: string;

  @ManyToOne(() => ProjectDataFieldEntity, { onDelete: 'CASCADE' })
  field!: ProjectDataFieldEntity;

  @Column()
  fieldUuid!: string;
}
