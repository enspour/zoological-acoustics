import { KuduIsAvailablePipe } from './is-available.pipe';

describe('IsAvailablePipe', () => {
  it('create an instance', () => {
    const pipe = new KuduIsAvailablePipe();
    expect(pipe).toBeTruthy();
  });
});
