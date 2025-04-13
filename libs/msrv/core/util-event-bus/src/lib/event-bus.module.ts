import { DynamicModule, INestApplication, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { EventBusService } from './event-bus.service';

export interface EventBusConsumerOptions {
  queue: string;
  group: string;
}

export interface EventBusProviderOptions {
  queue: string;
}

@Module({})
export class EventBusModule {
  static connect(app: INestApplication, options: EventBusConsumerOptions) {
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

  static forProvider(options: EventBusProviderOptions): DynamicModule {
    return {
      module: EventBusModule,
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
      providers: [EventBusService],
      exports: [EventBusService],
    };
  }
}
