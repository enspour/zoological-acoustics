import { MkIsAvailablePipe } from './is-available.pipe';

describe('IsAvailablePipe', () => {
  it('create an instance', () => {
    const pipe = new MkIsAvailablePipe();
    expect(pipe).toBeTruthy();
  });
});
