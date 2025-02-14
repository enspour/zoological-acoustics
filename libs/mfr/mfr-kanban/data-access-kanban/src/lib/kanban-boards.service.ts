import { Injectable, signal } from '@angular/core';
import { KanbanBoard } from './interfaces';

@Injectable()
export class KanbanBoardsService {
  public boards = signal<KanbanBoard[]>([
    { uuid: '1', title: 'Board 1' },
    { uuid: '2', title: 'Board 2' },
    { uuid: '3', title: 'Board 3' },
    { uuid: '4', title: 'Board 4' },
    { uuid: '5', title: 'Board 5' },
    { uuid: '6', title: 'Board 6' },
  ]);
}
