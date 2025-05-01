import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDuplicationController } from './employee-duplication.controller';

describe('EmployeeDuplicationController', () => {
  let controller: EmployeeDuplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeDuplicationController],
    }).compile();

    controller = module.get<EmployeeDuplicationController>(EmployeeDuplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
