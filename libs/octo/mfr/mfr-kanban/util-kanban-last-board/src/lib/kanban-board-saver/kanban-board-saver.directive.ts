import { Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { LocalStorageService } from '@octo/mfr-util-local-storage';

import { LS_KANBAN_LAST_BOARD } from '../constants';

@Directive({
  selector: '[libKanbanBoardSaver]',
})
export class KanbanBoardSaverDirective {
  private route = inject(ActivatedRoute);

  private localStorageService = inject(LocalStorageService);

  constructor() {
    this.route.params.pipe(takeUntilDestroyed()).subscribe((params) => {
      const { boardUuid } = params;

      if (boardUuid) {
        this.localStorageService.set(LS_KANBAN_LAST_BOARD, boardUuid);
      }
    });
  }
}
