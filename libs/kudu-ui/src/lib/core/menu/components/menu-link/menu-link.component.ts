import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  inject,
  input,
  OnChanges,
  output,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { kuduSize } from '../../../size';
import { kuduMenuItemToken } from '../../tokens/menu-item.token';

@Component({
  selector: 'a[kudu-menu-link]',
  templateUrl: './menu-link.component.html',
  styleUrl: './menu-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: kuduMenuItemToken, useExisting: KuduMenuLinkComponent },
  ],
  hostDirectives: [RouterLink, RouterLinkActive],
})
export class KuduMenuLinkComponent implements OnChanges {
  private routerLink = inject(RouterLink);
  private routerLinkActive = inject(RouterLinkActive);

  private size = inject(kuduSize);

  public href = input.required<string>();
  public exact = input<boolean>(false);

  public byClick = output<Event>();

  ngOnChanges(): void {
    this.routerLink.routerLink = this.href();
    this.routerLinkActive.routerLinkActive = 'active';
    this.routerLinkActive.routerLinkActiveOptions = { exact: this.exact() };
  }

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }

  @HostListener('click', ['$event'])
  public onClick(event: Event) {
    this.byClick.emit(event);
  }
}
