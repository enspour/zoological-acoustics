import { utilPassword } from './util-password';

describe('utilPassword', () => {
  it('should work', () => {
    expect(utilPassword()).toEqual('util-password');
  });
});
