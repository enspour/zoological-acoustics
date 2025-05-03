import { TestBed } from '@angular/core/testing';

import { MkActiveElementService } from './active-element.service';

describe('MkActiveElementService', () => {
  let service: MkActiveElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MkActiveElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
