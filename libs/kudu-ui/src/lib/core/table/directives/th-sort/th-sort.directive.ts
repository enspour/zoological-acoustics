import { computed, Directive, HostBinding, inject } from '@angular/core';

import { KuduSortByDirective, KuduSortDirective } from '../../../sort';

@Directive({
  selector: '[kuduThSort]',
  hostDirectives: [
    { directive: KuduSortByDirective, inputs: ['kuduSortBy: kuduThSort'] },
  ],
})
export class KuduTableHeaderSortDirective {
  private sort = inject(KuduSortDirective, { optional: true });
  private sortBy = inject(KuduSortByDirective, { self: true });

  private sortOrder = computed(() => {
    const config = this.sort?.config();

    if (!config) {
      return '';
    }

    return this.sortBy?.by() === config.by ? config.order : '';
  });

  @HostBinding('class')
  public get Classes() {
    return `
      ${this.sortBy ? 'sortable' : ''}
      ${this.sortOrder() ? `sortable--${this.sortOrder()}` : ''}
    `;
  }
}
