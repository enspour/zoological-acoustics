import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { kanbanRedirectionGuard } from '../kanban-redirection.guard';

describe('kanbanRedirectionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      kanbanRedirectionGuard(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
