import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  HostBinding,
  inject,
  input,
  output,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';

import { mkSize } from '../../../size';

import { MkTab } from '../../interfaces';

import { mkTab, mkTabContent, mkTabs } from '../../tokens';

@Component({
  selector: 'mk-tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: mkTab, useExisting: MkTabComponent }],
})
export class MkTabComponent implements MkTab {
  private size = inject(mkSize);
  private tabs = inject(mkTabs);

  public orientation = this.tabs.orientation;

  public explicitContent = contentChild(mkTabContent, { read: TemplateRef });
  public implicitContent = viewChild(TemplateRef);

  public name = input.required<string>();
  public isActive = signal(false);

  public byClick = output<Event>();

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }

  public onClick(event: Event) {
    this.tabs.open(this);
    this.byClick.emit(event);
  }

  public setIsActive(isActive: boolean) {
    this.isActive.set(isActive);
  }
}
