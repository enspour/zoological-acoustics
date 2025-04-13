import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  input,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { KuduFilterPipe } from '@kudu-ng-utils';

import {
  KuduButtonComponent,
  KuduDialogService,
  KuduIconComponent,
  KuduInputComponent,
  KuduInputContainerComponent,
} from '@kudu-ui';

import { ProjectMember } from '@kudu/domain';

import { ProjectMemberTableComponent } from '@kudu/mfr-ui-project';

import { InviteProjectMemberComponent } from '@kudu/mfr-feature-invite-project-member';

@Component({
  selector: 'lib-members',
  imports: [
    FormsModule,
    KuduIconComponent,
    KuduInputContainerComponent,
    KuduInputComponent,
    KuduButtonComponent,
    KuduFilterPipe,
    ProjectMemberTableComponent,
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersComponent {
  private injector = inject(Injector);
  private dialogService = inject(KuduDialogService);

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
