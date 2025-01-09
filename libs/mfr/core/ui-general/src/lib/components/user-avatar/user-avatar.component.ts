import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { User } from '@kudu/domain';

@Component({
  selector: 'lib-user-avatar',
  imports: [],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent {
  public user = input.required<User>();

  public initials = computed(() =>
    this.user()
      .name.split(' ')
      .slice(0, 2)
      .filter((item) => item)
      .map((item) => item[0])
      .join('')
      .toUpperCase(),
  );
}
