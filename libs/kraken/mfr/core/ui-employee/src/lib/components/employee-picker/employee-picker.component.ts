import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MkFilterPipe, MkFindPipe } from '@meerkat-ng-utils';

import {
  MkIconComponent,
  MkInputComponent,
  MkPopupComponent,
  MkPopupConfig,
  MkPopupTogglerDirective,
} from '@meerkat-ui';

import { Employee } from '@kraken/domain';

import { EmployeeAvatarsComponent } from '../employee-avatars';

@Component({
  selector: 'lib-employee-picker',
  imports: [
    FormsModule,
    MkFilterPipe,
    MkFindPipe,
    MkIconComponent,
    MkInputComponent,
    MkPopupComponent,
    MkPopupTogglerDirective,
    EmployeeAvatarsComponent,
  ],
  templateUrl: './employee-picker.component.html',
  styleUrl: './employee-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeePickerComponent {
  public employees = input.required<Employee[]>();

  public value = model.required<Employee[]>();

  public multiple = input(false);

  public searchTerm = signal('');

  public config: MkPopupConfig = {
    width: 'self-width',
    gap: 4,
  };

  public byClose = output<Employee[]>();

  public onClose() {
    this.byClose.emit(this.value());
  }

  public onSelect(employee: Employee) {
    const index = this.value().findIndex((e) => e.uuid === employee.uuid);

    if (!this.multiple()) {
      return this.value.set([employee]);
    }

    if (index !== -1) {
      this.value.update((employees) => employees.toSpliced(index, 1));
    } else {
      this.value.update((employees) => [...employees, employee]);
    }
  }

  public filterBySearchFn(searchTerm: string) {
    return (value: Employee) =>
      value.name.toLowerCase().includes(searchTerm.toLowerCase());
  }

  public findByUuidFn(uuid: string) {
    return (value: Employee) => value.uuid === uuid;
  }
}
