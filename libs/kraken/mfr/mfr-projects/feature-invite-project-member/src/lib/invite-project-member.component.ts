import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MkIconComponent,
  MkInputComponent,
  MkInputContainerComponent,
} from '@meerkat-ui';

import { MkFilterPipe } from '@meerkat-ng-utils';

import { ProjectMember } from '@kraken/domain';

import { EmployeeTableComponent } from '@kraken/mfr-ui-employee';

import { EmployeesService } from '@kraken/mfr-data-access-employees';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'lib-invite-project-member',
  imports: [
    FormsModule,
    MkInputContainerComponent,
    MkInputComponent,
    MkIconComponent,
    MkFilterPipe,
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
