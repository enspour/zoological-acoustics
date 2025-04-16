import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
  output,
} from '@angular/core';

import { KuduEditableComponent, KuduIconComponent } from '@kudu-ui';

import { Employee, Task } from '@kudu/domain';

import { EmployeesService } from '@kudu/mfr-data-access-employees';
import { TasksService } from '@kudu/mfr-data-access-tasks';

import { EmployeePickerComponent } from '@kudu/mfr-ui-employee';
import { TaskMoreComponent } from '@kudu/mfr-ui-task';

@Component({
  selector: 'lib-kanban-task',
  imports: [
    KuduIconComponent,
    KuduEditableComponent,
    TaskMoreComponent,
    EmployeePickerComponent,
  ],
  templateUrl: './kanban-task.component.html',
  styleUrl: './kanban-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanTaskComponent {
  private tasksService = inject(TasksService);
  private employeesService = inject(EmployeesService);

  public task = input.required<Task>();

  public employees = this.employeesService.employees;
  public employeesSelected = linkedSignal({
    source: () => ({
      task: this.task(),
      employees: this.employees(),
    }),
    computation: ({ task, employees }) => {
      return employees.filter((e) => task.executorUuids.includes(e.uuid));
    },
  });

  public byDelete = output<Task>();

  public onDelete() {
    this.byDelete.emit(this.task());
  }

  public async onClose(employees: Employee[]) {
    await this.tasksService.updateTask({
      ...this.task(),
      executorUuids: employees.map((e) => e.uuid),
    });
  }
}
