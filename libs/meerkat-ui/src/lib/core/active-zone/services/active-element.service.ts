import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  of,
  repeat,
  share,
  Subject,
  switchMap,
  take,
  takeUntil,
  timer,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MkActiveElementService {
  private document = inject(DOCUMENT);

  private focusout$ = fromEvent<FocusEvent>(this.document, 'focusout');
  private focusin$ = fromEvent<FocusEvent>(this.document, 'focusin');
  private mousedown$ = fromEvent<Event>(this.document, 'mousedown');
  private mouseup$ = fromEvent<Event>(this.document, 'mouseup');

  private loss$ = this.focusout$.pipe(
    takeUntil(this.mousedown$),
    repeat({ delay: () => this.mouseup$ }),
    filter(({ relatedTarget }) => !!relatedTarget),
    map(({ relatedTarget }) => relatedTarget as HTMLElement | null),
  );

  private gain$ = this.focusin$.pipe(
    map(({ target }) => target as HTMLElement | null),
  );

  private mouse$ = this.mousedown$.pipe(
    switchMap(({ target }) =>
      this.document.activeElement === this.document.body
        ? of(target as HTMLElement | null)
        : this.focusout$.pipe(
            take(1),
            takeUntil(timer(0)),
            map(() => target as HTMLElement | null),
          ),
    ),
  );

  private set$ = new Subject<HTMLElement>();
  private clear$ = new Subject<void>();

  public activeElement$ = merge(
    this.loss$,
    this.gain$,
    this.mouse$,
    this.set$,
    this.clear$,
  ).pipe(distinctUntilChanged(), share());

  public set(element: HTMLElement) {
    element.focus();
    this.set$.next(element);
  }

  public clear() {
    (this.document.activeElement as HTMLElement).blur();
    this.clear$.next();
  }
}
