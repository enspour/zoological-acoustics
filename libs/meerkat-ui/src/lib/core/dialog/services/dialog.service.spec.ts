import { TestBed } from '@angular/core/testing';

import { MkDialogService } from './dialog.service';

describe('DialogService', () => {
  let service: MkDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MkDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
