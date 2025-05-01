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
import { mkTabContent } from '../../directives/tab-content.directive';
import { MkTabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'mk-tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkTabComponent {
  private size = inject(mkSize);
  private tabs = inject(MkTabsComponent);

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
}
