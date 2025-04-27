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
  KuduOverlayComponent,
  KuduOverlayConfig,
  KuduOverlayPlacement,
} from '../../../overlay';

import { KuduPopupTriggerDirective } from '../../directives/popup-trigger.directive';

export type KuduPopupConfig = KuduOverlayConfig;

export type KuduPopupPlacement = KuduOverlayPlacement;

@Component({
  selector: 'kudu-popup',
  imports: [KuduOverlayComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduPopupComponent {
  private popupTriggerDirective = inject(KuduPopupTriggerDirective);

  public origin = this.popupTriggerDirective.origin;
  public isOpen = this.popupTriggerDirective.isOpen;

  public config = input<KuduPopupConfig>();

  public placementChange = output<KuduPopupPlacement>();

  public byClose = outputFromObservable(
    toObservable(this.isOpen).pipe(
      filter((isOpen) => !isOpen),
      skip(1),
    ),
  );
}
