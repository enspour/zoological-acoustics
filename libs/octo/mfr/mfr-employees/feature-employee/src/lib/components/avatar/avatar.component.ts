import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { MkIconComponent } from '@meerkat-ui';

import { EmployeePageComponent } from '../../employee-page.component';

@Component({
  selector: 'lib-avatar',
  imports: [MkIconComponent],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  private page = inject(EmployeePageComponent);

  public initials = computed(() => {
    const employee = this.page.employee();

    if (!employee) {
      return '';
    }

    return employee.name
      .split(' ')
      .slice(0, 2)
      .filter((item) => item)
      .map((item) => item[0])
      .join('')
      .toUpperCase();
  });
}
