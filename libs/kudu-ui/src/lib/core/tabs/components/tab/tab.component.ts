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

@Component({
  selector: 'kudu-tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduTabComponent {
  private size = inject(kuduSize);

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
