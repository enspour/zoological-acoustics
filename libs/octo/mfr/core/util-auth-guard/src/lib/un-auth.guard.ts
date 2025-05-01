import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '@octo/mfr-data-access-auth';

@Injectable({
  providedIn: 'root',
})
export class UnAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  public canActivate(): boolean {
    if (!this.authService.auth()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
