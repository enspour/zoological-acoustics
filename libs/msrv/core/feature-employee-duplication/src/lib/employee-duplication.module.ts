import { DynamicModule, Module, Type } from '@nestjs/common';

import { PostgresModule } from '@kudu/msrv-data-access-postgres';

import { EmployeeDuplicationController } from './employee-duplication.controller';
import { EmployeeDuplicationService } from './employee-duplication.service';

@Module({})
export class EmployeeDuplicationModule {
  static forRoot<T extends Type<{ uuid: string; name: string }>>(
    entity: T,
  ): DynamicModule {
    return {
      module: EmployeeDuplicationModule,
      imports: [PostgresModule.forFeature([entity])],
      controllers: [EmployeeDuplicationController],
      providers: [
        EmployeeDuplicationService,
        { provide: 'ENTITY', useValue: entity },
      ],
    };
  }
}
