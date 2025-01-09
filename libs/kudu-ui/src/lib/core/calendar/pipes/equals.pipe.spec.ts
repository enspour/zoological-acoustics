import { KuduEqualsPipe } from './equals.pipe';

describe('EqualsPipe', () => {
  it('create an instance', () => {
    const pipe = new KuduEqualsPipe();
    expect(pipe).toBeTruthy();
  });
});
