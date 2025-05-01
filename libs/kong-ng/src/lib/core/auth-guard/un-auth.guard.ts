import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { KongAuthService } from '../auth-service';

@Injectable({
  providedIn: 'root',
})
export class KongUnAuthGuard implements CanActivate {
  constructor(
    private authService: KongAuthService,
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
