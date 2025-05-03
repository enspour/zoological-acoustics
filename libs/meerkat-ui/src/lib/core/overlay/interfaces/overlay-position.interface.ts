import { ElementRef, Signal } from '@angular/core';

export interface MkOverlayPosition {
  attach(container: ElementRef<HTMLElement>): Signal<DOMRect>;
  dispose(): void;
}
