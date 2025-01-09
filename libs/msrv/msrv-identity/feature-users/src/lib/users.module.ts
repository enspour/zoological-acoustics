import { Module } from '@nestjs/common';

import { PostgresModule } from '@kudu/msrv-data-access-postgres';
import { UserEventsModule } from '@kudu/msrv-feature-user-events';

import { UserCredentialsEntity, UserEntity } from './entity';

import { UserCredentialsService } from './services/user-credentials.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    PostgresModule.forFeature([UserEntity, UserCredentialsEntity]),
    UserEventsModule,
  ],
  providers: [UsersService, UserCredentialsService],
  exports: [UsersService, UserCredentialsService],
})
export class UsersModule {}
