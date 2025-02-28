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

import { TaskBoard } from '@kudu/domain';

import { ConfirmationModalComponent } from '@kudu/mfr-ui-modals';

@Component({
  selector: 'lib-task-board-more',
  imports: [
    KuduIconComponent,
    KuduMenuByTriggerComponent,
    KuduMenuButtonComponent,
    KuduMenuTriggerDirective,
  ],
  templateUrl: './task-board-more.component.html',
  styleUrl: './task-board-more.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskBoardMoreComponent {
  private dialog = inject(KuduDialogService);

  public board = input.required<TaskBoard>();

  public isOpen = signal(false);

  public byRename = output<TaskBoard>();
  public byDelete = output<TaskBoard>();

  public onToggle() {
    this.isOpen.update((value) => !value);
  }

  public onRename() {
    this.byRename.emit(this.board());
  }

  public async onDelete() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      hasBackdrop: true,
      data: {
        title: 'Удаление доски',
        description: `Вы уверены, что хотите удалить доску "${this.board().title}"?`,
      },
    });

    dialogRef.afterClosed().subscribe(async (isConfirm) => {
      if (isConfirm) {
        this.byDelete.emit(this.board());
      }
    });
  }
}
