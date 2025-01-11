import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';

import { KuduSidebarMode } from './sidebar.interface';

@Component({
  selector: 'kudu-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduSidebarComponent {
  public isOpen = input.required<boolean>();

  public maxWidth = input.required<number>();
  public minWidth = input<number>(0);
  public mode = input<KuduSidebarMode>('push');

  @HostBinding('class')
  get Classes() {
    return this.mode();
  }

  @HostBinding('style.width.px')
  @HostBinding('style.min-width.px')
  get Width() {
    return this.isOpen() ? this.maxWidth() : this.minWidth();
  }
}
