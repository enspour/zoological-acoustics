import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  input,
  linkedSignal,
  signal,
} from '@angular/core';

import { clamp } from '@meerkat-utils';

import { MkSidebarMode } from './sidebar.interface';

@Component({
  selector: 'mk-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkSidebarComponent {
  public isOpen = input.required<boolean>();

  public width = input<number>();
  public maxWidth = input.required<number>();
  public minWidth = input<number>(0);
  public mode = input<MkSidebarMode>('push');

  public isTransition = signal(false);
  public transition = linkedSignal({
    source: this.isOpen,
    computation: () => 'width 0.2s, min-width 0.2s',
  });

  @HostBinding('class')
  get Classes() {
    return this.mode();
  }

  @HostBinding('style.width.px')
  get Width() {
    return this.isOpen() ? this.WidthWhenOpen : this.WidthWhenClose;
  }

  get WidthWhenOpen() {
    return clamp(
      this.width() ?? this.maxWidth(),
      this.minWidth(),
      this.maxWidth(),
    );
  }

  get WidthWhenClose() {
    return this.mode() === 'push' ? this.minWidth() : 0;
  }

  @HostBinding('style.transition')
  get Transition() {
    return this.transition();
  }

  @HostListener('transitionstart')
  public onTransitionStart() {
    this.isTransition.set(true);
  }

  @HostListener('transitionend')
  public onTransitionEnd() {
    this.isTransition.set(false);
    this.transition.set('none');
  }
}
