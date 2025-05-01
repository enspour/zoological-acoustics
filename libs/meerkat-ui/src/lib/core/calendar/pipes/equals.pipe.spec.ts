import { MkEqualsPipe } from './equals.pipe';

describe('EqualsPipe', () => {
  it('create an instance', () => {
    const pipe = new MkEqualsPipe();
    expect(pipe).toBeTruthy();
  });
});
