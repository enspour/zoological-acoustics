import {
  contentChildren,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  linkedSignal,
  output,
} from '@angular/core';

import { MkDndService } from './dnd.service';
import { MkDndDragDirective } from './drag.directive';

import { MkDndDrag, MkDndDrop } from './interfaces';

@Directive({
  selector: '[mkDndDropContainer]',
})
export class MkDndDropContainerDirective<T = any> {
  private dndService = inject(MkDndService);

  public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private _children = contentChildren(MkDndDragDirective);
  public children = linkedSignal(() => this._children());

  public types = input.required<string[]>({
    alias: 'mkDndDropContainerTypes',
  });

  public data = input<T>(undefined, { alias: 'mkDndDropContainerData' });
  public disabled = input(false, { alias: 'mkDndDropContainerDisabled' });

  public byDrop = output<MkDndDrop>();
  public byDragOver = output<MkDndDrag>();
  public byDragEnter = output<MkDndDrag>();
  public byDragLeave = output<MkDndDrag>();

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const instance = this.dndService.drop();

    if (instance) {
      this.byDrop.emit({
        event,
        draggable: instance.draggable.data(),
        prevIndex: instance.source.index,
        prevContainer: instance.source.container.data(),
        nextIndex: instance.target.index,
        nextContainer: instance.target.container.data(),
      });

      this.dndService.reset();
    }
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent) {
    event.preventDefault();

    if (this.disabled()) {
      return;
    }

    this.dndService.dragover(this, {
      x: event.clientX,
      y: event.clientY,
    });

    this.byDragOver.emit({ event });
  }

  public insertChild(child: MkDndDragDirective, index: number) {
    this.children.update((children) => children.toSpliced(index, 0, child));
  }

  public removeChild(child: MkDndDragDirective) {
    this.children.update((children) => children.filter((e) => e !== child));
  }

  public indexChildOf(child: MkDndDragDirective) {
    return this.children().indexOf(child);
  }
}
