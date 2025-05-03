import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { filter, skip } from 'rxjs';

import {
  MkOverlayComponent,
  MkOverlayFlexibleConfig,
  MkOverlayFlexiblePlacement,
  MkOverlayFlexiblePositionDirective,
} from '../../../overlay';

import { mkPopupTrigger } from '../../tokens';

export type MkPopupConfig = MkOverlayFlexibleConfig;
export type MkPopupPlacement = MkOverlayFlexiblePlacement;

@Component({
  selector: 'mk-popup',
  imports: [MkOverlayComponent, MkOverlayFlexiblePositionDirective],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkPopupComponent {
  private popupTriggerDirective = inject(mkPopupTrigger);

  public origin = this.popupTriggerDirective.origin;
  public isOpen = this.popupTriggerDirective.isOpen;

  public config = input<MkPopupConfig>();

  public placementChange = output<MkPopupPlacement>();

  public byClose = outputFromObservable(
    toObservable(this.isOpen).pipe(
      filter((isOpen) => !isOpen),
      skip(1),
    ),
  );
}
