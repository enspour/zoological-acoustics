import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import {
  KuduDialogService,
  KuduIconComponent,
  KuduMenuButtonComponent,
  KuduMenuByTriggerComponent,
  KuduMenuTriggerDirective,
} from '@kudu-ui';

import { TaskColumn } from '@kudu/domain';

import { ConfirmationModalComponent } from '@kudu/mfr-ui-modals';

@Component({
  selector: 'lib-task-column-more',
  imports: [
    KuduIconComponent,
    KuduMenuByTriggerComponent,
    KuduMenuButtonComponent,
    KuduMenuTriggerDirective,
  ],
  templateUrl: './task-column-more.component.html',
  styleUrl: './task-column-more.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskColumnMoreComponent {
  private dialog = inject(KuduDialogService);

  public column = input.required<TaskColumn>();

  public isOpen = signal(false);

  public byRename = output<TaskColumn>();
  public byDelete = output<TaskColumn>();

  public onToggle() {
    this.isOpen.update((value) => !value);
  }

  public onRename() {
    this.byRename.emit(this.column());
  }

  public async onDelete() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      hasBackdrop: true,
      data: {
        title: 'Удаление доски',
        description: `Вы уверены, что хотите удалить колонку "${this.column().title}"?`,
      },
    });

    dialogRef.afterClosed().subscribe(async (isConfirm) => {
      if (isConfirm) {
        this.byDelete.emit(this.column());
      }
    });
  }
}
