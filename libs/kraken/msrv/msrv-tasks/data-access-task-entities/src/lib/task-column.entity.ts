import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TaskColumn } from '@kraken/domain';

import { TaskBoardEntity } from './task-board.entity';
import { TaskEntity } from './task.entity';

@Entity()
export class TaskColumnEntity implements TaskColumn {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  title!: string;

  @Column({ default: '#7b869e' })
  color!: string;

  @Column('uuid')
  boardUuid!: string;

  @ManyToOne(() => TaskBoardEntity, (board) => board.columns, {
    onDelete: 'CASCADE',
  })
  board!: TaskBoardEntity;

  @OneToMany(() => TaskEntity, (task) => task.column)
  tasks!: TaskEntity[];
}
