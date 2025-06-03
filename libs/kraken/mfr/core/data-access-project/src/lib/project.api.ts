import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { GetProjectResponseDto } from './dtos';

@Injectable()
export class ProjectApi {
  constructor(private http: HttpClient) {}

  public getByUuid(uuid: string) {
    const url = `api/v1/projects/projects/${uuid}`;
    return this.http
      .get<GetProjectResponseDto>(url)
      .pipe(map((response) => response.data.project));
  }
}
