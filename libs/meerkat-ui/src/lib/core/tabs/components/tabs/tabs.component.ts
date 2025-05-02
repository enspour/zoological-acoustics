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

import { MkTab, MkTabs, MkTabsOrientation } from '../../interfaces';

import { mkTab, mkTabs } from '../../tokens';

@Component({
  selector: 'mk-tabs',
  imports: [NgTemplateOutlet],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: mkTabs, useExisting: MkTabsComponent }],
})
export class MkTabsComponent implements MkTabs {
  public size = inject(mkSize);

  private tabs = contentChildren(mkTab);

  public orientation = input<MkTabsOrientation>('horizontal');

  public currentTab = computed(() => this.tabs()[this.currentIndex()]);
  public currentIndex = model(0);

  private previousIndex = linkedSignal<number, number>({
    source: this.currentIndex,
    computation: (_, previous) => (previous ? previous.source : 0),
  });

  constructor() {
    effect(() => {
      this.tabs()[this.previousIndex()].setIsActive(false);
      this.tabs()[this.currentIndex()].setIsActive(true);
    });
  }

  @HostBinding('class')
  public get Classes() {
    return `${this.size()} ${this.orientation()}`;
  }

  public open(tab: MkTab) {
    const index = this.tabs().findIndex((t) => t === tab);

    if (index !== -1) {
      this.currentIndex.set(index);
    }
  }
}
