import { GetEmployeesByUuidPipe } from './get-employees-by-uuid.pipe';

describe('GetEmployeesByUuidPipe', () => {
  it('create an instance', () => {
    const pipe = new GetEmployeesByUuidPipe();
    expect(pipe).toBeTruthy();
  });
});
