import { DynamicModule, Module, Type } from '@nestjs/common';

import { PostgresModule } from '@kudu/msrv-data-access-postgres';

import { UserDuplicationController } from './user-duplication.controller';
import { UserDuplicationService } from './user-duplication.service';

@Module({})
export class UserDuplicationModule {
  static forRoot<T extends Type<{ uuid: string; name: string }>>(
    entity: T,
  ): DynamicModule {
    return {
      module: UserDuplicationModule,
      imports: [PostgresModule.forFeature([entity])],
      controllers: [UserDuplicationController],
      providers: [
        UserDuplicationService,
        { provide: 'ENTITY', useValue: entity },
      ],
    };
  }
}
