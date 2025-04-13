import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  KuduIconComponent,
  KuduInputComponent,
  KuduInputContainerComponent,
} from '@kudu-ui';

import { KuduFilterPipe } from '@kudu-ng-utils';

import { ProjectMember } from '@kudu/domain';

import { EmployeeTableComponent } from '@kudu/mfr-ui-employee';

import { EmployeesService } from '@kudu/mfr-data-access-employees';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'lib-invite-project-member',
  imports: [
    FormsModule,
    KuduInputContainerComponent,
    KuduInputComponent,
    KuduIconComponent,
    KuduFilterPipe,
    EmployeeTableComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './invite-project-member.component.html',
  styleUrl: './invite-project-member.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteProjectMemberComponent {
  private employeesService = inject(EmployeesService);

  public employees = this.employeesService.employees;

  public searchTerm = signal('');

  public filterFn(search: string) {
    return (member: ProjectMember) =>
      member.name.toLowerCase().includes(search.toLowerCase());
  }
}
