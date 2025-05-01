import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, from, Observable, switchMap, tap, throwError } from 'rxjs';

import { AuthService } from '../auth-service';

import { BYPASS_AUTH_INTERCEPTOR } from '../../tokens';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private router = inject(Router);
  private authService = inject(AuthService);

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (req.context.get(BYPASS_AUTH_INTERCEPTOR)) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.tryRefresh().pipe(switchMap(() => next.handle(req)));
        }

        return throwError(() => error);
      }),
    );
  }

  private tryRefresh() {
    return from(this.authService.refresh()).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          [403, 404].includes(error.status)
        ) {
          return from(this.authService.logout()).pipe(
            tap(() => this.router.navigateByUrl('/login')),
          );
        }

        return throwError(() => error);
      }),
    );
  }
}
