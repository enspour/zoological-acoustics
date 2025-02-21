import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { AccessTokenPayload } from '@kudu/domain';

import { decodeToken } from '@kudu/msrv-util-jwt';
import { TokenStorage } from './token.storage';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private tokenStorage: TokenStorage) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const type = context.getType();

    if (type === 'http') {
      return new Observable((subscriber) => {
        const http = context.switchToHttp();
        const request = http.getRequest<Request>();

        const token = request.cookies['access-token'];
        const store = decodeToken<AccessTokenPayload>(token);

        const subscription = this.tokenStorage.run(store, () => {
          return next.handle().subscribe(subscriber);
        });

        return () => subscription.unsubscribe();
      });
    }

    return next.handle();
  }
}
