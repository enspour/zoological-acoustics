import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { ProjectMemberEntity } from './project-member.entity';
import { ProjectEntity } from './project.entity';

@Entity()
export class ProjectToMemberEntity {
  @PrimaryColumn()
  projectUuid!: string;

  @ManyToOne(() => ProjectEntity, { onDelete: 'CASCADE' })
  project!: ProjectEntity;

  @PrimaryColumn()
  memberUuid!: string;

  @ManyToOne(() => ProjectMemberEntity, { onDelete: 'CASCADE' })
  member!: ProjectMemberEntity;
}
