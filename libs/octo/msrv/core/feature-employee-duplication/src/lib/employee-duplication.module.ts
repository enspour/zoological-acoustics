import { DynamicModule, Module, Type } from '@nestjs/common';

import { MkPostgresModule } from '@meerkat-nest-pg';

import { EmployeeDuplicationController } from './employee-duplication.controller';
import { EmployeeDuplicationService } from './employee-duplication.service';

@Module({})
export class EmployeeDuplicationModule {
  static forRoot<T extends Type<{ uuid: string; name: string }>>(
    entity: T,
  ): DynamicModule {
    return {
      module: EmployeeDuplicationModule,
      imports: [MkPostgresModule.forFeature([entity])],
      controllers: [EmployeeDuplicationController],
      providers: [
        EmployeeDuplicationService,
        { provide: 'ENTITY', useValue: entity },
      ],
    };
  }
}
