import { Module } from '@nestjs/common';

import { MkPostgresModule } from '@meerkat-nest-pg';

import { UserEventsModule } from '@kong/msrv-feature-user-events';

import {
  UserCredentialsEntity,
  UserEntity,
} from 'libs/kong/msrv/data-access-entities/src';

import { UserCredentialsService } from './services/user-credentials.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    MkPostgresModule.forFeature([UserEntity, UserCredentialsEntity]),
    UserEventsModule,
  ],
  providers: [UsersService, UserCredentialsService],
  exports: [UsersService, UserCredentialsService],
})
export class UsersModule {}
