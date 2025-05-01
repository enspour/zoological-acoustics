import { Test, TestingModule } from '@nestjs/testing';
import { MkTransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: MkTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MkTransactionService],
    }).compile();

    service = module.get<MkTransactionService>(MkTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
