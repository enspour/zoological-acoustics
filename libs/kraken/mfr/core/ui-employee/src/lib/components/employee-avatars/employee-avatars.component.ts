import { SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';

import { Employee } from '@kraken/domain';

import { EmployeeAvatarComponent } from '../employee-avatar';

@Component({
  selector: 'lib-employee-avatars',
  imports: [SlicePipe, EmployeeAvatarComponent],
  templateUrl: './employee-avatars.component.html',
  styleUrl: './employee-avatars.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeAvatarsComponent {
  public employees = input.required<Employee[]>();
  public employeeSize = input(28);

  public max = input(5);
  public offset = input(8);

  @HostBinding('style.--employee-size.px')
  public get EmployeeSize() {
    return this.employeeSize();
  }

  @HostBinding('style.width.px')
  public get Width() {
    const max = this.max();
    const offset = this.offset();

    const employees = this.employees();
    const employeeSize = this.employeeSize();

    const count = employees.length <= max ? employees.length : max + 1;
    const total = count * employeeSize;
    const totalOffset = offset * (count - 1);

    return total - totalOffset;
  }
}
