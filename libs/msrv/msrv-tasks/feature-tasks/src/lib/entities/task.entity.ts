import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Task } from '@kudu/domain';

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

  @Column('uuid')
  columnUuid!: string;

  @ManyToMany(() => TaskColumnEntity, (column) => column.tasks, {
    onDelete: 'CASCADE',
  })
  column!: TaskColumnEntity;

  @Column('uuid', { array: true })
  executorUuids!: string[];

  @Column('uuid')
  creatorUuid!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: string;
}
