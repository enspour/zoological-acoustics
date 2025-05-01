import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TaskBoard } from '@octo/domain';

import { TaskColumnEntity } from './task-column.entity';
import { TaskEntity } from './task.entity';

@Entity()
export class TaskBoardEntity implements TaskBoard {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  title!: string;

  @Column({ type: 'uuid' })
  projectUuid!: string;

  @OneToMany(() => TaskEntity, (task) => task.board)
  tasks!: TaskEntity[];

  @OneToMany(() => TaskColumnEntity, (column) => column.board)
  columns!: TaskColumnEntity[];
}
