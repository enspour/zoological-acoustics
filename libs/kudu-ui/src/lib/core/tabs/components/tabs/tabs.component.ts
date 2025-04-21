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

import { kuduSize } from '../../../size';

import { KuduTabComponent } from '../tab/tab.component';

export type KuduTabsOrientation = 'vertical' | 'horizontal';

@Component({
  selector: 'kudu-tabs',
  imports: [NgTemplateOutlet],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduTabsComponent {
  public size = inject(kuduSize);

  private tabs = contentChildren(KuduTabComponent);

  public orientation = input<KuduTabsOrientation>('horizontal');

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

  public open(tab: KuduTabComponent) {
    const index = this.tabs().findIndex((t) => t === tab);

    if (index !== -1) {
      this.currentIndex.set(index);
    }
  }
}
