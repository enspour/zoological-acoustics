import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { KongAccessTokenPayload } from '@kong-jwt';

import { decodeToken, parseCookie } from '../../utils';

import { KongAuthApi } from './auth.api';

export type KongAuth = { token: KongAuthToken };
export type KongAuthToken = { payload: KongAccessTokenPayload };

@Injectable()
export class KongAuthService {
  private document = inject(DOCUMENT);

  public auth = signal<KongAuth | null>(null);

  constructor(private authApi: KongAuthApi) {
    this.checkAuth();
  }

  public async signup(
    username: string,
    password: string,
    user: { name: string },
  ) {
    const request = this.authApi.signup({ username, password, ...user });
    const response = await lastValueFrom(request);

    if (response.statusCode === 200) {
      this.checkAuth();
    }

    return response;
  }

  public async login(username: string, password: string) {
    const request = this.authApi.login({ username, password });
    const response = await lastValueFrom(request);

    if (response.statusCode === 200) {
      this.checkAuth();
    }

    return response;
  }

  public async logout() {
    const request = this.authApi.logout();
    const response = await lastValueFrom(request);

    if (response.statusCode === 200) {
      this.checkAuth();
    }

    return response;
  }

  public async refresh() {
    const request = this.authApi.refresh();
    const response = await lastValueFrom(request);

    if (response.statusCode === 200) {
      this.checkAuth();
    }

    return response;
  }

  private checkAuth() {
    const cookies = parseCookie(this.document.cookie);

    const token = cookies['access-token'];

    if (token) {
      const payload = decodeToken<KongAccessTokenPayload>(token);

      if (payload) {
        return this.auth.set({ token: { payload } });
      }
    }

    this.auth.set(null);
  }
}
