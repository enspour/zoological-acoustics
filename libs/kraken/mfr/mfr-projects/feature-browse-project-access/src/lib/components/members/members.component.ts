import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  input,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MkFilterPipe } from '@meerkat-ng-utils';

import {
  MkButtonComponent,
  MkDialogService,
  MkIconComponent,
  MkInputComponent,
  MkInputContainerComponent,
} from '@meerkat-ui';

import { ProjectMember } from '@kraken/domain';

import { ProjectMemberTableComponent } from '@kraken/mfr-ui-project';

import { InviteProjectMemberComponent } from '@kraken/mfr-feature-invite-project-member';

@Component({
  selector: 'lib-members',
  imports: [
    FormsModule,
    MkIconComponent,
    MkInputContainerComponent,
    MkInputComponent,
    MkButtonComponent,
    MkFilterPipe,
    ProjectMemberTableComponent,
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersComponent {
  private injector = inject(Injector);
  private dialogService = inject(MkDialogService);

  public members = input.required<ProjectMember[]>();

  public searchTerm = signal('');

  public onMemberInvite() {
    this.dialogService.open(InviteProjectMemberComponent, {
      injector: this.injector,
      hasBackdrop: true,
      minWidth: '600px',
      width: '40%',
    });
  }

  public filterFn(search: string) {
    return (member: ProjectMember) =>
      member.name.toLowerCase().includes(search.toLowerCase());
  }
}
