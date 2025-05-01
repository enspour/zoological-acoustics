import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { KongUser } from '@kong-domain';

import { UserCredentialsEntity } from './user-credentials.entity';

@Entity()
export class UserEntity implements KongUser {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  name!: string;

  @OneToOne(() => UserCredentialsEntity, { cascade: true })
  credentials!: UserCredentialsEntity;
}
