import { DynamicModule, INestApplication, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { MkEventBusService } from './event-bus.service';

export interface MkEventBusConsumerOptions {
  queue: string;
  group: string;
}

export interface MkEventBusProviderOptions {
  queue: string;
}

@Module({})
export class MkEventBusModule {
  static connect(app: INestApplication, options: MkEventBusConsumerOptions) {
    app.connectMicroservice({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: options.queue,
          brokers: [process.env['KAFKA_URL'] || 'localhost:9092'],
        },
        consumer: {
          groupId: `${options.group}-consumer`,
        },
      },
    });
  }

  static forProvider(options: MkEventBusProviderOptions): DynamicModule {
    return {
      module: MkEventBusModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: 'CLIENT',

            imports: [ConfigModule],
            inject: [ConfigService],

            useFactory: (configService: ConfigService) => ({
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: options.queue,
                  brokers: [configService.get('KAFKA_URL') || 'localhost:9092'],
                },
              },
            }),
          },
        ]),
      ],
      providers: [MkEventBusService],
      exports: [MkEventBusService],
    };
  }
}
