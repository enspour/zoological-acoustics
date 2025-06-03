import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { GetProjectMembersResponseDto } from './dtos';

@Injectable()
export class ProjectMembersApi {
  constructor(private http: HttpClient) {}

  public getMembersByProject(uuid: string) {
    const url = `api/v1/projects/projects/${uuid}/members`;
    return this.http
      .get<GetProjectMembersResponseDto>(url)
      .pipe(map((response) => response.data.members));
  }
}
