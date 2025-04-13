import { SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';

import { ProjectMember } from '@kudu/domain';

import { EmployeeAvatarComponent } from '@kudu/mfr-ui-employee';

@Component({
  selector: 'lib-project-member-avatars',
  imports: [SlicePipe, EmployeeAvatarComponent],
  templateUrl: './project-member-avatars.component.html',
  styleUrl: './project-member-avatars.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectMemberAvatarsComponent {
  public members = input.required<ProjectMember[]>();
  public memberSize = input(28);

  public max = input(5);

  @HostBinding('style.--member-size.px')
  public get MemberSize() {
    return this.memberSize();
  }

  @HostBinding('style.width.px')
  public get Width() {
    const max = this.max();

    const members = this.members();
    const memberSize = this.memberSize();

    const count = members.length <= max ? members.length : max + 1;
    const total = count * memberSize;
    const totalOffset = (memberSize / 4) * (count - 1);

    return total - totalOffset;
  }
}
