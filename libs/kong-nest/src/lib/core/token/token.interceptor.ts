import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { kongDecodeAccessToken } from '@kong-jwt';

import { KongTokenStorage } from './token.storage';

@Injectable()
export class KongTokenInterceptor implements NestInterceptor {
  constructor(private tokenStorage: KongTokenStorage) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const type = context.getType();

    if (type === 'http') {
      return new Observable((subscriber) => {
        const http = context.switchToHttp();
        const request = http.getRequest<Request>();

        const token = request.cookies['access-token'];
        const store = kongDecodeAccessToken(token);

        const subscription = this.tokenStorage.run(store, () => {
          return next.handle().subscribe(subscriber);
        });

        return () => subscription.unsubscribe();
      });
    }

    return next.handle();
  }
}
