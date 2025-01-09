import { Test, TestingModule } from '@nestjs/testing';
import { UserDuplicationController } from './user-duplication.controller';

describe('UserDuplicationController', () => {
  let controller: UserDuplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDuplicationController],
    }).compile();

    controller = module.get<UserDuplicationController>(UserDuplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
