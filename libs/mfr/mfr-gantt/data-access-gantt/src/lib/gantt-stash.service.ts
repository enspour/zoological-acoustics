import { inject, Injectable } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';

import { LocalStorageService } from '@kudu/mfr-util-local-storage';

import { ProjectService } from '@kudu/mfr-data-access-project';

import { GanttStashItem } from './interfaces';

const LS_GANTT_STASH = '__v1/gantt/stash';

@Injectable()
export class GanttStashService {
  private localStorageService = inject(LocalStorageService);
  private projectService = inject(ProjectService);

  public stash = toSignal(
    toObservable(this.projectService.project).pipe(
      switchMap((project) => {
        if (project) {
          const key = `${LS_GANTT_STASH}/${project.uuid}`;
          return this.localStorageService.subscriber<GanttStashItem[]>(key);
        }

        return of([]);
      }),
    ),
  );

  public isOpen(item: GanttStashItem) {
    const stash = this.stash() || [];
    return !stash.includes(item);
  }

  public toggle(item: GanttStashItem) {
    const project = this.projectService.project();

    if (!project) {
      return;
    }

    const key = `${LS_GANTT_STASH}/${project.uuid}`;
    const stash = this.localStorageService.get<GanttStashItem[]>(key) || [];

    const index = stash.findIndex((i) => i === item);

    if (index === -1) {
      this.localStorageService.set(key, [...stash, item]);
    } else {
      this.localStorageService.set(key, stash.toSpliced(index, 1));
    }
  }
}
