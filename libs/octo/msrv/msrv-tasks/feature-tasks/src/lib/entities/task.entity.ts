import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Task } from '@octo/domain';

import { TaskBoardEntity } from './task-board.entity';
import { TaskColumnEntity } from './task-column.entity';

@Entity()
export class TaskEntity implements Task {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  title!: string;

  @Column('timestamptz')
  startDate!: string;

  @Column('timestamptz')
  endDate!: string;

  @Column('uuid')
  boardUuid!: string;

  @ManyToOne(() => TaskBoardEntity, (board) => board.tasks, {
    onDelete: 'CASCADE',
  })
  board!: TaskBoardEntity;

  @Column('uuid', { nullable: true })
  columnUuid!: string | null;

  @ManyToOne(() => TaskColumnEntity, (column) => column.tasks, {
    onDelete: 'CASCADE',
  })
  column!: TaskColumnEntity | null;

  @Column('uuid', { array: true })
  executorUuids!: string[];

  @Column('uuid')
  createdByUuid!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: string;
}
