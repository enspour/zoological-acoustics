import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '@kudu/domain';
import { UserCredentialsEntity } from './user-credentials.entity';

@Entity()
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  name!: string;

  @OneToOne(() => UserCredentialsEntity, { cascade: true })
  credentials!: UserCredentialsEntity;
}
