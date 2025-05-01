import { Injectable } from '@nestjs/common';

import { KongTokenStorage } from './token.storage';

@Injectable()
export class KongTokenService {
  constructor(private tokenStorage: KongTokenStorage) {}

  public get() {
    return this.tokenStorage.getStore() || null;
  }
}
