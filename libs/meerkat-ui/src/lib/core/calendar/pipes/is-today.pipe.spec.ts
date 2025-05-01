import { MkIsTodayPipe } from './is-today.pipe';

describe('IsTodayPipe', () => {
  it('create an instance', () => {
    const pipe = new MkIsTodayPipe();
    expect(pipe).toBeTruthy();
  });
});
