import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { KuduFilterPipe, KuduFindPipe } from '@kudu-ng-utils';

import {
  KuduIconComponent,
  KuduInputComponent,
  KuduOverlayComponent,
  KuduOverlayConfig,
  KuduOverlayOriginDirective,
  KuduOverlayPositionX,
  KuduOverlayPositionY,
} from '@kudu-ui';

import { Employee } from '@kudu/domain';

import { EmployeeAvatarComponent } from '../employee-avatar';

@Component({
  selector: 'lib-employee-picker',
  imports: [
    FormsModule,
    KuduFilterPipe,
    KuduFindPipe,
    KuduIconComponent,
    KuduInputComponent,
    KuduOverlayComponent,
    EmployeeAvatarComponent,
  ],
  templateUrl: './employee-picker.component.html',
  styleUrl: './employee-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [KuduOverlayOriginDirective],
})
export class EmployeePickerComponent {
  public origin = inject(KuduOverlayOriginDirective);

  public employees = input.required<Employee[]>();

  public value = model.required<Employee[]>();

  public multiple = input(false);

  public isOpen = signal(false);

  public searchTerm = signal('');

  public config: KuduOverlayConfig = {
    width: 'self-width',
    positionX: 'left',
    positionY: 'under',
    lockX: false,
    lockY: false,
    gap: 4,
  };

  public positionX = signal<KuduOverlayPositionX>('right');
  public positionY = signal<KuduOverlayPositionY>('under');

  public byClose = output<Employee[]>();

  public onToggle() {
    if (this.isOpen()) {
      this.onClose();
    } else {
      this.onOpen();
    }
  }

  public onClose() {
    this.isOpen.set(false);
    this.byClose.emit(this.value());
  }

  public onOpen() {
    this.isOpen.set(true);
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

  public filterBySearchFn(value: Employee, _: number, searchTerm: string) {
    return value.name.toLowerCase().includes(searchTerm.toLowerCase());
  }

  public findByUuidFn(value: Employee, _: number, uuid: string) {
    return value.uuid === uuid;
  }
}
