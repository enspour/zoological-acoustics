import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ProjectMembersService } from '@octo/mfr-data-access-project';

import { HeaderComponent } from './components/header/header.component';
import { MembersComponent } from './components/members/members.component';

@Component({
  selector: 'lib-browse-project-access-modal',
  imports: [HeaderComponent, MembersComponent],
  templateUrl: './browse-project-access-modal.component.html',
  styleUrl: './browse-project-access-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseProjectAccessModalComponent {
  private projectMembersService = inject(ProjectMembersService);

  public members = this.projectMembersService.members;
}
