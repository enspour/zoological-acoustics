import { Test, TestingModule } from '@nestjs/testing';
import { ProjectDataValuesController } from './project-data-values.controller';

describe('ProjectDataValuesController', () => {
  let controller: ProjectDataValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectDataValuesController],
    }).compile();

    controller = module.get<ProjectDataValuesController>(
      ProjectDataValuesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
