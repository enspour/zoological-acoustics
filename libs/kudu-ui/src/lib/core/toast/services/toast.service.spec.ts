import { TestBed } from '@angular/core/testing';

import { KuduToastService } from './toast.service';

describe('ToastService', () => {
  let service: KuduToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KuduToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
