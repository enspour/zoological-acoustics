import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TabLinkComponent, TabsComponent } from '@kraken/mfr-ui-kit';

import { UniqueComponent } from '@kraken/mfr-util-unique-component';

import { EmployeePageComponent } from '../../employee-page.component';

@Component({
  selector: 'lib-header',
  imports: [TabsComponent, TabLinkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends UniqueComponent {
  private page = inject(EmployeePageComponent);

  public employee = this.page.employee;
}
