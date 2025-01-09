import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserCredentials } from '@kudu/domain';
import { UserEntity } from './user.entity';

@Entity()
export class UserCredentialsEntity implements UserCredentials {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  hashedPassword!: string;

  @Column({ type: 'uuid', nullable: true })
  userUuid!: string;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  user!: UserEntity;
}
