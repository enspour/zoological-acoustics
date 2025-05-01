import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class MkEventBusService {
  constructor(@Inject('CLIENT') private client: ClientKafka) {}

  public emit<T>(pattern: string, data: T) {
    return this.client.emit(pattern, data).subscribe();
  }
}
