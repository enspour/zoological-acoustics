import {
  computed,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { MkDndService } from './dnd.service';
import { MkDndDropContainerDirective } from './drop-container.directive';

import { MkDndDrag } from './interfaces';

@Directive({
  selector: '[mkDndDrag]',
  host: {
    '[draggable]': '!disabled()',
    '[style.opacity]': 'isDraggable() ? 0 : 1',
  },
})
export class MkDndDragDirective<T = any> {
  private dndService = inject(MkDndService);
  private dropContainerDirective = inject(MkDndDropContainerDirective);

  public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public container = signal(this.dropContainerDirective);

  public type = input.required<string>({ alias: 'mkDndDragType' });
  public data = input<T>(undefined, { alias: 'mkDndDragData' });
  public disabled = computed(() => this.getDisabled());

  public isDraggable = computed(() => this.getIsDraggable());

  public byDragStart = output<MkDndDrag>();
  public byDragEnd = output<MkDndDrag>();

  @HostListener('dragstart', ['$event'])
  public onDragStart(event: DragEvent) {
    event.stopPropagation();

    this.dndService.dragstart(this);

    this.byDragStart.emit({ event });
  }

  @HostListener('dragend', ['$event'])
  public onDragEnd(event: DragEvent) {
    this.dndService.dragend();

    this.byDragEnd.emit({ event });
  }

  private getDisabled() {
    return this.container().disabled();
  }

  private getIsDraggable() {
    return this.dndService.dragRef()?.Instance.draggable === this;
  }
}
