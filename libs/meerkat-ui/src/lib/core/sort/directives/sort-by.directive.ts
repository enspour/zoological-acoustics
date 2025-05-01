import { Directive, HostListener, inject, input } from '@angular/core';

import { MkSortDirective } from './sort.directive';

@Directive({
  selector: '[mkSortBy]',
})
export class MkSortByDirective {
  private sort = inject(MkSortDirective);

  public by = input<string | undefined>(undefined, {
    alias: 'mkSortBy',
  });

  @HostListener('click')
  public onClick() {
    const by = this.by();

    if (!by) {
      return;
    }

    this.sort.toggleOrder(by);
  }
}
