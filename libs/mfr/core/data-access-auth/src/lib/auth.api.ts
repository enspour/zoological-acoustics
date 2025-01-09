import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BYPASS_AUTH_INTERCEPTOR } from '@kudu/mfr-util-http';

import {
  LoginDto,
  LoginResponseDto,
  LogoutResponseDto,
  RefreshResponseDto,
  SignupDto,
  SignupResponseDto,
} from './dtos';

@Injectable()
export class AuthApi {
  private prefix = 'api/v1/identity/auth';

  constructor(private http: HttpClient) {}

  public signup(dto: SignupDto) {
    return this.http.post<SignupResponseDto>(`${this.prefix}/signup`, dto, {
      context: new HttpContext().set(BYPASS_AUTH_INTERCEPTOR, true),
    });
  }

  public login(dto: LoginDto) {
    return this.http.post<LoginResponseDto>(`${this.prefix}/login`, dto, {
      context: new HttpContext().set(BYPASS_AUTH_INTERCEPTOR, true),
    });
  }

  public logout() {
    return this.http.post<LogoutResponseDto>(`${this.prefix}/logout`, null, {
      context: new HttpContext().set(BYPASS_AUTH_INTERCEPTOR, true),
    });
  }

  public refresh() {
    return this.http.post<RefreshResponseDto>(`${this.prefix}/refresh`, null, {
      context: new HttpContext().set(BYPASS_AUTH_INTERCEPTOR, true),
    });
  }
}
