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

import { kuduSize } from '../../../size';
import { kuduTabContent } from '../../directives/tab-content.directive';
import { KuduTabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'kudu-tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduTabComponent {
  private size = inject(kuduSize);
  private tabs = inject(KuduTabsComponent);

  public orientation = this.tabs.orientation;

  public explicitContent = contentChild(kuduTabContent, { read: TemplateRef });
  public implicitContent = viewChild(TemplateRef);

  public name = input.required<string>();
  public isActive = signal(false);

  public byClick = output<Event>();

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }

  public onClick(event: Event) {
    this.byClick.emit(event);
  }
}
