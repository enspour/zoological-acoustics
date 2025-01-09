import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { parseCookie } from '@kudu/mfr-util-cookie';
import { decodeToken } from '@kudu/mfr-util-jwt';

import { AuthApi } from './auth.api';

export type Auth = { token: AuthToken };
export type AuthToken = { payload: AuthTokenPayload };
export type AuthTokenPayload = {
  sub: string;
  name: string;
  exp: number;
  iat: number;
};

@Injectable()
export class AuthService {
  private document = inject(DOCUMENT);

  public auth = signal<Auth | null>(null);

  constructor(private authApi: AuthApi) {
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
      const payload = decodeToken<AuthTokenPayload>(token);

      if (payload) {
        return this.auth.set({ token: { payload } });
      }
    }

    this.auth.set(null);
  }
}
