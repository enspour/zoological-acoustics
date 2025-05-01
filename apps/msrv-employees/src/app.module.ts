import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MkPostgresModule } from '@meerkat-nest-pg';

import { KongTokenModule } from '@kong-nest';

import { EmployeesModule } from '@octo/msrv-feature-employees';

import { EmployeeEntity } from '@octo/msrv-data-access-employee-entities';

import { AppController } from './controllers/app.controller';
import { EmployeesController } from './controllers/employees.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MkPostgresModule.forRootAsync([EmployeeEntity]),
    KongTokenModule,
    EmployeesModule,
  ],
  controllers: [AppController, EmployeesController],
})
export class AppModule {}
