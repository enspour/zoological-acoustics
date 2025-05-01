import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  HostBinding,
  inject,
  input,
  linkedSignal,
  model,
} from '@angular/core';

import { mkSize } from '../../../size';

import { MkTabComponent } from '../tab/tab.component';

export type MkTabsOrientation = 'vertical' | 'horizontal';

@Component({
  selector: 'mk-tabs',
  imports: [NgTemplateOutlet],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkTabsComponent {
  public size = inject(mkSize);

  private tabs = contentChildren(MkTabComponent);

  public orientation = input<MkTabsOrientation>('horizontal');

  public tab = computed(() => this.tabs()[this.currentIndex()]);

  public currentIndex = model(0);

  private previousIndex = linkedSignal<number, number>({
    source: this.currentIndex,
    computation: (_, previous) => (previous ? previous.source : 0),
  });

  constructor() {
    effect(() => {
      this.tabs()[this.previousIndex()].isActive.set(false);
      this.tabs()[this.currentIndex()].isActive.set(true);
    });
  }

  @HostBinding('class')
  public get Classes() {
    return `${this.size()} ${this.orientation()}`;
  }

  public open(tab: MkTabComponent) {
    const index = this.tabs().findIndex((t) => t === tab);

    if (index !== -1) {
      this.currentIndex.set(index);
    }
  }
}
