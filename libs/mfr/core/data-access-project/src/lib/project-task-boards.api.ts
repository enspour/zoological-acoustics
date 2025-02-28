import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { CreatableTaskBoard } from '@kudu/domain';

import {
  CreateTaskBoardResponseDto,
  DeleteTaskBoardResponseDto,
  GetTaskBoardsByProjectResponseDto,
} from './dtos';

@Injectable()
export class ProjectTaskBoardsApi {
  constructor(private http: HttpClient) {}

  public getBoardsByProject(uuid: string) {
    const url = `api/v1/tasks/boards/by-project/${uuid}`;
    return this.http
      .get<GetTaskBoardsByProjectResponseDto>(url)
      .pipe(map((response) => response.data.boards));
  }

  public createBoard(data: CreatableTaskBoard) {
    const url = 'api/v1/tasks/boards';
    return this.http
      .post<CreateTaskBoardResponseDto>(url, data)
      .pipe(map((response) => response.data.board));
  }

  public deleteBoard(uuid: string) {
    const url = `api/v1/tasks/boards/${uuid}`;
    return this.http
      .delete<DeleteTaskBoardResponseDto>(url)
      .pipe(map((response) => response.data.board));
  }
}
