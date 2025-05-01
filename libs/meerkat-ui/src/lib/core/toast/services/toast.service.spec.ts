import { TestBed } from '@angular/core/testing';

import { MkToastService } from './toast.service';

describe('ToastService', () => {
  let service: MkToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MkToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
