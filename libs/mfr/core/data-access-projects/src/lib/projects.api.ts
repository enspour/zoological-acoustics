import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import {
  CreateProjectDto,
  CreateProjectResponseDto,
  GetProjectsResponseDto,
} from './dtos';

@Injectable()
export class ProjectsApi {
  constructor(private http: HttpClient) {}

  public getAll() {
    const url = `api/v1/projects/projects`;
    return this.http
      .get<GetProjectsResponseDto>(url)
      .pipe(map((response) => response.data.projects));
  }

  public create(data: CreateProjectDto) {
    const url = `api/v1/projects/projects`;
    return this.http
      .post<CreateProjectResponseDto>(url, data)
      .pipe(map((response) => response.data.project));
  }
}
