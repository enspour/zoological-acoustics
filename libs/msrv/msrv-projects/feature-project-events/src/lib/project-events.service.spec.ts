import { Test, TestingModule } from '@nestjs/testing';
import { ProjectEventsService } from './project-events.service';

describe('ProjectEventsService', () => {
  let service: ProjectEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectEventsService],
    }).compile();

    service = module.get<ProjectEventsService>(ProjectEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
