import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { User } from '@kudu/domain';

@Component({
  selector: 'lib-employee-avatar',
  imports: [],
  templateUrl: './employee-avatar.component.html',
  styleUrl: './employee-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--avatar-size.px]': 'avatarSize()',
  },
})
export class EmployeeAvatarComponent {
  public avatar = input.required<User>();
  public avatarSize = input<number>();

  public initials = computed(() =>
    this.avatar()
      .name.split(' ')
      .slice(0, 2)
      .filter((item) => item)
      .map((item) => item[0])
      .join('')
      .toUpperCase(),
  );
}
