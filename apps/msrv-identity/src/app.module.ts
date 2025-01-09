import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostgresModule } from '@kudu/msrv-data-access-postgres';
import { AuthModule } from '@kudu/msrv-feature-auth';
import {
  UserCredentialsEntity,
  UserEntity,
  UsersModule,
} from '@kudu/msrv-feature-users';

import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresModule.forRootAsync([UserEntity, UserCredentialsEntity]),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, AuthController, UsersController],
})
export class AppModule {}
