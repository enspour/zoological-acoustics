import { KongAuthGuard } from './auth.guard';

describe('KongAuthGuard', () => {
  it('should be defined', () => {
    expect(new KongAuthGuard()).toBeDefined();
  });
});
