import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostgresModule } from '@kudu/msrv-data-access-postgres';
import { EmployeeEntity, EmployeesModule } from '@kudu/msrv-feature-employees';
import { TokenModule } from '@kudu/msrv-feature-token';

import { AppController } from './controllers/app.controller';
import { EmployeesController } from './controllers/employees.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresModule.forRootAsync([EmployeeEntity]),
    EmployeesModule,
    TokenModule,
  ],
  controllers: [AppController, EmployeesController],
})
export class AppModule {}
