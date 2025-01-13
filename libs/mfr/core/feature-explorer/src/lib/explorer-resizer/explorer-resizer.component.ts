import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';

import { ExplorerService } from '../explorer.service';

@Component({
  selector: 'lib-explorer-resizer',
  imports: [],
  templateUrl: './explorer-resizer.component.html',
  styleUrl: './explorer-resizer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplorerResizerComponent implements OnDestroy {
  private document = inject(DOCUMENT);
  private explorerService = inject(ExplorerService);

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
        const x = event.clientX;
        const y = event.clientY;

        this.move({ x, y });
      });

    fromEvent<MouseEvent>(this.document, 'mouseup')
      .pipe(takeUntil(this.cleaner$))
      .subscribe(() => this.stop());
  }

  public move(position: { x: number; y: number }) {
    const width = this.document.body.clientWidth - position.x;
    this.explorerService.setWidth(width);
  }

  public stop() {
    this.cleaner$.next();
    this.isResizing.set(false);
  }
}
