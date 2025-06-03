import { DynamicModule, Module, Type } from '@nestjs/common';

import { MkPostgresModule } from '@meerkat-nest-pg';

import { UserDuplicationController } from './user-duplication.controller';
import { UserDuplicationService } from './user-duplication.service';

@Module({})
export class UserDuplicationModule {
  static forRoot<T extends Type<{ uuid: string; name: string }>>(
    entity: T,
  ): DynamicModule {
    return {
      module: UserDuplicationModule,
      imports: [MkPostgresModule.forFeature([entity])],
      controllers: [UserDuplicationController],
      providers: [
        UserDuplicationService,
        { provide: 'ENTITY', useValue: entity },
      ],
    };
  }
}
