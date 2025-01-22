import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
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
export class KuduTabsComponent implements AfterContentInit {
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

  ngAfterContentInit(): void {
    this.tabs().forEach((tab, index) => {
      tab.byClick.subscribe(() => this.currentIndex.set(index));
    });
  }
}
