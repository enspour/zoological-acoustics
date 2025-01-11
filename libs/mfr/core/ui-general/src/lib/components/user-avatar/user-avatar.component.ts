import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject,
  input,
} from '@angular/core';

import { kuduSize } from '@kudu-ui';

import { User } from '@kudu/domain';

@Component({
  selector: 'lib-user-avatar',
  imports: [],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent {
  private size = inject(kuduSize);

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

  @HostBinding('class')
  public get Classes() {
    return `${this.size()} `;
  }
}
