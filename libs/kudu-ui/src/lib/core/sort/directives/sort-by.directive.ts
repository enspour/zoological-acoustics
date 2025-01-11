import { Directive, HostListener, inject, input } from '@angular/core';

import { KuduSortDirective } from './sort.directive';

@Directive({
  selector: '[kuduSortBy]',
})
export class KuduSortByDirective {
  private sort = inject(KuduSortDirective);

  public by = input<string | undefined>(undefined, {
    alias: 'kuduSortBy',
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
