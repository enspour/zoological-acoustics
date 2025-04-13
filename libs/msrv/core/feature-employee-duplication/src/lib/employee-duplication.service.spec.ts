import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDuplicationService } from './employee-duplication.service';

describe('EmployeeDuplicationService', () => {
  let service: EmployeeDuplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeDuplicationService],
    }).compile();

    service = module.get<EmployeeDuplicationService>(EmployeeDuplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
