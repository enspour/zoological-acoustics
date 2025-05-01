import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { GetUserResponseDto } from './dtos';

@Injectable()
export class UserApi {
  constructor(private http: HttpClient) {}

  public getUser(uuid: string) {
    const url = `api/v1/identity/users/${uuid}`;
    return this.http
      .get<GetUserResponseDto>(url)
      .pipe(map((response) => response.data.user));
  }
}
