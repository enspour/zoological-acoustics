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

import { KuduDnDService } from './dnd.service';
import { KuduDropContainerDirective } from './drop-container.directive';

import { KuduDrag } from './interfaces';

@Directive({
  selector: '[kuduDrag]',
  host: {
    '[draggable]': '!disabled()',
    '[style.opacity]': 'isDraggable() ? 0 : 1',
  },
})
export class KuduDragDirective<T = any> {
  private dndService = inject(KuduDnDService);
  private dropContainerDirective = inject(KuduDropContainerDirective);

  public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public container = signal(this.dropContainerDirective);

  public type = input.required<string>({ alias: 'kuduDragType' });
  public data = input<T>(undefined, { alias: 'kuduDragData' });
  public disabled = computed(() => this.getDisabled());

  public isDraggable = computed(() => this.getIsDraggable());

  public byDragStart = output<KuduDrag>();
  public byDragEnd = output<KuduDrag>();

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
