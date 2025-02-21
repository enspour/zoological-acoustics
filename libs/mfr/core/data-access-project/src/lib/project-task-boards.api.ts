import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { GetTaskBoardsByProjectDto } from './dtos';

@Injectable()
export class ProjectTaskBoardsApi {
  constructor(private http: HttpClient) {}

  public getBoardsByProject(uuid: string) {
    const url = `api/v1/tasks/boards/by-project/${uuid}`;
    return this.http
      .get<GetTaskBoardsByProjectDto>(url)
      .pipe(map((response) => response.data.boards));
  }
}
