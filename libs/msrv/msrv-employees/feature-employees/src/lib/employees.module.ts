import { Module } from '@nestjs/common';

import { PostgresModule } from '@kudu/msrv-data-access-postgres';
import { UserDuplicationModule } from '@kudu/msrv-feature-user-duplication';

import { EmployeeEntity } from './entities';

import { EmployeesService } from './services/employees.service';

@Module({
  imports: [
    PostgresModule.forFeature([EmployeeEntity]),
    UserDuplicationModule.forRoot(EmployeeEntity),
  ],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
