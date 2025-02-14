import { KanbanBoardService } from './kanban-board.service';
import { KanbanBoardsService } from './kanban-boards.service';

export const provideKanbanDataAccess = () => [
  KanbanBoardService,
  KanbanBoardsService,
];
