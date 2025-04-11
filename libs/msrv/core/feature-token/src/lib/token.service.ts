import { Injectable } from '@nestjs/common';

import { TokenStorage } from './token.storage';

@Injectable()
export class TokenService {
  constructor(private tokenStorage: TokenStorage) {}

  public get() {
    return this.tokenStorage.getStore() || null;
  }
}
