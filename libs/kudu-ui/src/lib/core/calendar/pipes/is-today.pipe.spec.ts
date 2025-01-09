import { KuduIsTodayPipe } from './is-today.pipe';

describe('IsTodayPipe', () => {
  it('create an instance', () => {
    const pipe = new KuduIsTodayPipe();
    expect(pipe).toBeTruthy();
  });
});
