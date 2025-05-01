import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { KongTokenInterceptor } from './token.interceptor';
import { KongTokenService } from './token.service';
import { KongTokenStorage } from './token.storage';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: KongTokenInterceptor },
    KongTokenStorage,
    KongTokenService,
  ],
  exports: [KongTokenService],
})
export class KongTokenModule {}
