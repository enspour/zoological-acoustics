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

import { KuduDndService } from './dnd.service';
import { KuduDndDragDirective } from './drag.directive';

import { KuduDndDrag, KuduDndDrop } from './interfaces';

@Directive({
  selector: '[kuduDndDropContainer]',
})
export class KuduDndDropContainerDirective<T = any> {
  private dndService = inject(KuduDndService);

  public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private _children = contentChildren(KuduDndDragDirective);
  public children = linkedSignal(() => this._children());

  public types = input.required<string[]>({
    alias: 'kuduDndDropContainerTypes',
  });

  public data = input<T>(undefined, { alias: 'kuduDndDropContainerData' });
  public disabled = input(false, { alias: 'kuduDndDropContainerDisabled' });

  public byDrop = output<KuduDndDrop>();
  public byDragOver = output<KuduDndDrag>();
  public byDragEnter = output<KuduDndDrag>();
  public byDragLeave = output<KuduDndDrag>();

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

  public insertChild(child: KuduDndDragDirective, index: number) {
    this.children.update((children) => children.toSpliced(index, 0, child));
  }

  public removeChild(child: KuduDndDragDirective) {
    this.children.update((children) => children.filter((e) => e !== child));
  }

  public indexChildOf(child: KuduDndDragDirective) {
    return this.children().indexOf(child);
  }
}
