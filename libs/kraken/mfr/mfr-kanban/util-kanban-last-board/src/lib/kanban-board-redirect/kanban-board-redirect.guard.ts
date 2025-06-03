import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { MkLocalStorageService } from '@meerkat-ng-web-apis';

import { ProjectTaskBoardsService } from '@kraken/mfr-data-access-project';

import { LS_KANBAN_LAST_BOARD } from '../constants';

export const kanbanBoardRedirectGuard: CanActivateFn = (_, state) => {
  const router = inject(Router);
  const localStorageService = inject(MkLocalStorageService);
  const projectTaskBoardsService = inject(ProjectTaskBoardsService);

  const boards = projectTaskBoardsService.boards();

  if (boards.length === 0) {
    return true;
  }

  const lastUuid = localStorageService.get<string>(LS_KANBAN_LAST_BOARD);
  const last = boards.find((board) => board.uuid === lastUuid);

  if (last) {
    router.navigate([state.url, `board`, last.uuid]);
  } else {
    const first = boards[0];
    router.navigate([state.url, `board`, first.uuid]);
  }

  return false;
};
