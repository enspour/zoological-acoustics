import { Test, TestingModule } from '@nestjs/testing';
import { UserDuplicationService } from './user-duplication.service';

describe('UserDuplicationService', () => {
  let service: UserDuplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDuplicationService],
    }).compile();

    service = module.get<UserDuplicationService>(UserDuplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
