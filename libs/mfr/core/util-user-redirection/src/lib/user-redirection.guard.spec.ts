import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userRedirectionGuard } from './user-redirection.guard';

describe('userGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      userRedirectionGuard(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
