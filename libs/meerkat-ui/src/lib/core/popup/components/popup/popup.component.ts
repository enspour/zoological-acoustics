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
  MkOverlayConfig,
  MkOverlayPlacement,
} from '../../../overlay';

import { MkPopupTriggerDirective } from '../../directives/popup-trigger.directive';

export type MkPopupConfig = MkOverlayConfig;
export type MkPopupPlacement = MkOverlayPlacement;

@Component({
  selector: 'mk-popup',
  imports: [MkOverlayComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkPopupComponent {
  private popupTriggerDirective = inject(MkPopupTriggerDirective);

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
