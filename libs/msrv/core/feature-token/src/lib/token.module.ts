import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { TokenInterceptor } from './token.interceptor';
import { TokenService } from './token.service';
import { TokenStorage } from './token.storage';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TokenInterceptor },
    TokenStorage,
    TokenService,
  ],
  exports: [TokenService],
})
export class TokenModule {}
