import { Test, TestingModule } from '@nestjs/testing';
import { MkEventBusService } from './event-bus.service';

describe('EventBusService', () => {
  let service: MkEventBusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MkEventBusService],
    }).compile();

    service = module.get<MkEventBusService>(MkEventBusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
