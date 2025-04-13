import { Test, TestingModule } from '@nestjs/testing';
import { ProjectEventsController } from './project-events.controller';

describe('ProjectEventsController', () => {
  let controller: ProjectEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectEventsController],
    }).compile();

    controller = module.get<ProjectEventsController>(ProjectEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
