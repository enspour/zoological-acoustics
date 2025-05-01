import { Test, TestingModule } from '@nestjs/testing';
import { KongTokenService } from './token.service';

describe('TokenService', () => {
  let service: KongTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KongTokenService],
    }).compile();

    service = module.get<KongTokenService>(KongTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
