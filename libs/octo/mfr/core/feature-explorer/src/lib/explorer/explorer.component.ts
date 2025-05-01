import { NgComponentOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';

import { MkIconComponent, MkSidebarComponent } from '@meerkat-ui';

import { LocalStorageService } from '@octo/mfr-util-local-storage';

import { ExplorerResizerComponent } from '../explorer-resizer/explorer-resizer.component';
import { ExplorerRef } from '../explorer.interface';

const LS_EXPLORER = '__v1/explorer';

@Component({
  selector: 'lib-explorer',
  imports: [
    NgComponentOutlet,
    MkSidebarComponent,
    MkIconComponent,
    ExplorerResizerComponent,
  ],
  templateUrl: './explorer.component.html',
  styleUrl: './explorer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplorerComponent implements AfterViewInit {
  private localStorageService = inject(LocalStorageService);

  public explorer = input.required<ExplorerRef<unknown>>();

  public isOpen = signal(false);

  public width = linkedSignal(() => this.getInitialWidth());

  ngAfterViewInit(): void {
    setTimeout(() => this.isOpen.set(true));
  }

  public onClose() {
    this.isOpen.set(false);
    setTimeout(() => this.explorer().close(), 200);
  }

  public onWidthChange(width: number) {
    this.width.set(width);

    const id = this.explorer().id;
    const LS_EXPLORER_WIDTH = id
      ? `${LS_EXPLORER}/${id}/width`
      : `${LS_EXPLORER}/width`;

    this.localStorageService.set(LS_EXPLORER_WIDTH, width);
  }

  private getInitialWidth() {
    const id = this.explorer().id;
    const LS_EXPLORER_WIDTH = id
      ? `${LS_EXPLORER}/${id}/width`
      : `${LS_EXPLORER}/width`;

    return this.localStorageService.get<number>(LS_EXPLORER_WIDTH) || 550;
  }
}
