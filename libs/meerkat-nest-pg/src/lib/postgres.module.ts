import { DynamicModule, Module, Type } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { MkTransactionModule } from './transaction/transaction.module';

import { MkPostgresService } from './postgres.service';

@Module({})
export class MkPostgresModule {
  static forRootAsync(entities: Type[]): DynamicModule {
    const module = TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities,
        synchronize: true,
      }),

      dataSourceFactory: async (options) => {
        return await new DataSource(options!).initialize();
      },
    });

    return {
      ...module,
      imports: [...(module.imports || []), MkTransactionModule],
      providers: [...(module.providers || []), MkPostgresService],
      exports: [...(module.exports || []), MkPostgresService],
    };
  }

  static forFeature(entities?: Type[]): DynamicModule {
    const module = TypeOrmModule.forFeature(entities);

    return {
      ...module,
      imports: [...(module.imports || []), MkTransactionModule],
      providers: [...(module.providers || []), MkPostgresService],
      exports: [...(module.exports || []), MkPostgresService],
    };
  }
}
