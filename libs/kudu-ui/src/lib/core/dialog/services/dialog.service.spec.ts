import { TestBed } from '@angular/core/testing';

import { KuduDialogService } from './dialog.service';

describe('DialogService', () => {
  let service: KuduDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KuduDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
