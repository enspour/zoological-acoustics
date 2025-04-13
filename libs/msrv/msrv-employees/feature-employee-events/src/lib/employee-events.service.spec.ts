import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeEventsService } from './employee-events.service';

describe('EmployeeEventsService', () => {
  let service: EmployeeEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeEventsService],
    }).compile();

    service = module.get<EmployeeEventsService>(EmployeeEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
