import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TabLinkComponent, TabsComponent } from '@kudu/mfr-ui-kit';

import { EmployeePageComponent } from '../../employee-page.component';

@Component({
  selector: 'lib-header',
  imports: [TabsComponent, TabLinkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private page = inject(EmployeePageComponent);

  public employee = this.page.employee;
}
