import { Test, TestingModule } from '@nestjs/testing';
import { ProjectDataFieldsController } from './project-data-fields.controller';

describe('ProjectDataFieldsController', () => {
  let controller: ProjectDataFieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectDataFieldsController],
    }).compile();

    controller = module.get<ProjectDataFieldsController>(
      ProjectDataFieldsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
