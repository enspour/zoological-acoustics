import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';

import { GanttSidebarService } from '@kudu/mfr-data-access-gantt';

@Component({
  selector: 'lib-resizer',
  imports: [],
  templateUrl: './resizer.component.html',
  styleUrl: './resizer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResizerComponent implements OnDestroy {
  private document = inject(DOCUMENT);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private sidebarService = inject(GanttSidebarService);

  public isResizing = signal(false);
  public cleaner$ = new Subject<void>();

  ngOnDestroy(): void {
    this.stop();
    this.cleaner$.complete();
  }

  @HostBinding('class.resizing')
  public get IsResizing() {
    return this.isResizing();
  }

  @HostListener('mousedown')
  public start() {
    this.isResizing.set(true);

    fromEvent<MouseEvent>(this.document, 'mousemove')
      .pipe(takeUntil(this.cleaner$))
      .subscribe((event) => {
        const target = this.elementRef.nativeElement;
        const rect = target.parentElement?.getBoundingClientRect();

        const offsetLeft = rect?.left || 0;

        const x = event.clientX - offsetLeft;

        this.move({ x });
      });

    fromEvent<MouseEvent>(this.document, 'mouseup')
      .pipe(takeUntil(this.cleaner$))
      .subscribe(() => this.stop());
  }

  public move(position: { x: number }) {
    const width = position.x;
    this.sidebarService.setWidth(width);
  }

  public stop() {
    this.cleaner$.next();
    this.isResizing.set(false);
  }
}
