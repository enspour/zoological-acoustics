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

import { KuduDndService } from './dnd.service';
import { KuduDndDropContainerDirective } from './drop-container.directive';

import { KuduDndDrag } from './interfaces';

@Directive({
  selector: '[kuduDndDrag]',
  host: {
    '[draggable]': '!disabled()',
    '[style.opacity]': 'isDraggable() ? 0 : 1',
  },
})
export class KuduDndDragDirective<T = any> {
  private dndService = inject(KuduDndService);
  private dropContainerDirective = inject(KuduDndDropContainerDirective);

  public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public container = signal(this.dropContainerDirective);

  public type = input.required<string>({ alias: 'kuduDndDragType' });
  public data = input<T>(undefined, { alias: 'kuduDndDragData' });
  public disabled = computed(() => this.getDisabled());

  public isDraggable = computed(() => this.getIsDraggable());

  public byDragStart = output<KuduDndDrag>();
  public byDragEnd = output<KuduDndDrag>();

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
