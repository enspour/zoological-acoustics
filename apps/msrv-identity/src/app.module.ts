import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MkPostgresModule } from '@meerkat-nest-pg';

import { KongTokenModule } from '@kong-nest';

import {
  UserCredentialsEntity,
  UserEntity,
} from '@kong/msrv-data-access-entities';

import { AuthModule } from '@kong/msrv-feature-auth';
import { UsersModule } from '@kong/msrv-feature-users';

import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MkPostgresModule.forRootAsync([UserEntity, UserCredentialsEntity]),
    KongTokenModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, AuthController, UsersController],
})
export class AppModule {}
