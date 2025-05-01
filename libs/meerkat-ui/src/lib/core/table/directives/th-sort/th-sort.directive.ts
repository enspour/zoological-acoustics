import { computed, Directive, HostBinding, inject } from '@angular/core';

import { MkSortByDirective, MkSortDirective } from '../../../sort';

@Directive({
  selector: '[mkThSort]',
  hostDirectives: [
    { directive: MkSortByDirective, inputs: ['mkSortBy: mkThSort'] },
  ],
})
export class MkTableHeaderSortDirective {
  private sort = inject(MkSortDirective, { optional: true });
  private sortBy = inject(MkSortByDirective, { self: true });

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
