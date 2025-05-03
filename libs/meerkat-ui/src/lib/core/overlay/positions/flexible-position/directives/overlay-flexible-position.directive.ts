import { DOCUMENT } from '@angular/common';
import {
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import { MkOverlayFlexibleOriginDirective } from './overlay-flexible-origin.directive';

import { MkOverlayFlexiblePosition } from '../flexible-position';

import { MkOverlayPosition } from '../../../interfaces';
import { MkOverlayFlexibleConfig } from '../interfaces';

import { mkOverlayPosition } from '../../../tokens';

const initialConfig: Required<MkOverlayFlexibleConfig> = {
  width: 'self-width',
  placement: 'bottom-left',
  lockX: false,
  lockY: false,
  gap: 0,
};

@Directive({
  selector: '[mkOverlayFlexiblePosition]',
  providers: [
    {
      provide: mkOverlayPosition,
      useExisting: MkOverlayFlexiblePositionDirective,
    },
  ],
})
export class MkOverlayFlexiblePositionDirective implements MkOverlayPosition {
  private document = inject(DOCUMENT);

  public origin = input.required<MkOverlayFlexibleOriginDirective>({
    alias: 'mkOverlayFlexiblePositionOrigin',
  });

  public _config = input<MkOverlayFlexibleConfig>(undefined, {
    alias: 'mkOverlayFlexiblePositionConfig',
  });

  public config = computed(() => ({ ...initialConfig, ...this._config() }));

  private position = signal<MkOverlayFlexiblePosition | null>(null);

  private placement = computed(() => this.position()?.placement());
  public placementChange = outputFromObservable(
    toObservable(this.placement).pipe(filter((placement) => !!placement)),
    { alias: 'mkOverlayFlexiblePositionPlacementChange' },
  );

  public attach(container: ElementRef<HTMLElement>) {
    const position = new MkOverlayFlexiblePosition(
      this.document,
      this.config,
      this.origin,
      container,
    );

    this.position.set(position);

    return position.layout;
  }

  public dispose() {
    this.position.set(null);
  }
}
