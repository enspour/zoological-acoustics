import { Module } from '@nestjs/common';

import { MkPostgresModule } from '@meerkat-nest-pg';

import { EmployeeEventsModule } from '@kraken/msrv-feature-employee-events';
import { UserDuplicationModule } from '@kraken/msrv-feature-user-duplication';

import { EmployeeEntity } from '@kraken/msrv-data-access-employee-entities';

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
