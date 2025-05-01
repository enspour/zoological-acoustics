import { Test, TestingModule } from '@nestjs/testing';
import { MkPostgresService } from './postgres.service';

describe('PostgresService', () => {
  let service: MkPostgresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MkPostgresService],
    }).compile();

    service = module.get<MkPostgresService>(MkPostgresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
