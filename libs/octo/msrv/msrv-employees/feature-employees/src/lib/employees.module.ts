import { Module } from '@nestjs/common';

import { MkPostgresModule } from '@meerkat-nest-pg';

import { EmployeeEventsModule } from '@octo/msrv-feature-employee-events';
import { UserDuplicationModule } from '@octo/msrv-feature-user-duplication';

import { EmployeeEntity } from './entities';

import { EmployeesService } from './services/employees.service';

@Module({
  imports: [
    MkPostgresModule.forFeature([EmployeeEntity]),
    UserDuplicationModule.forRoot(EmployeeEntity),
    EmployeeEventsModule,
  ],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
