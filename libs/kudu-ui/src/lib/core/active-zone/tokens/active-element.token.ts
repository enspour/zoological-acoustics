import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

import {
  distinctUntilChanged,
  fromEvent,
  map,
  merge,
  of,
  repeat,
  share,
  switchMap,
  take,
  takeUntil,
  timer,
} from 'rxjs';

export const kuduActiveElement = new InjectionToken('kudu-ui/active-element', {
  factory: () => {
    const documentRef = inject(DOCUMENT);

    const focusout$ = fromEvent<FocusEvent>(documentRef, 'focusout');
    const focusin$ = fromEvent<FocusEvent>(documentRef, 'focusin');
    const mousedown$ = fromEvent<Event>(documentRef, 'mousedown');
    const mouseup$ = fromEvent<Event>(documentRef, 'mouseup');

    const loss$ = focusout$.pipe(
      takeUntil(mousedown$),
      repeat({ delay: () => mouseup$ }),
      map(({ relatedTarget }) => relatedTarget as HTMLElement | null),
    );

    const gain$ = focusin$.pipe(
      map(({ target }) => target as HTMLElement | null),
    );

    const mouse$ = mousedown$.pipe(
      switchMap(({ target }) =>
        documentRef.activeElement === documentRef.body
          ? of(target as HTMLElement | null)
          : focusout$.pipe(
              take(1),
              takeUntil(timer(0)),
              map(() => target as HTMLElement | null),
            ),
      ),
    );

    return merge(loss$, gain$, mouse$).pipe(distinctUntilChanged(), share());
  },
});
