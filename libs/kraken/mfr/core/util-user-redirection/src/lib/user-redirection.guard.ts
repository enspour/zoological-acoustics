import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserService } from '@kraken/mfr-data-access-user';

export const userRedirectionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  const user = userService.user();

  if (user) {
    router.navigate([state.url, user.uuid]);
    return false;
  }

  return true;
};
