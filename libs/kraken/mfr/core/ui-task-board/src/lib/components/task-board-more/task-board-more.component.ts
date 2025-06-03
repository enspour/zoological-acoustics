import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';

import {
  MkDialogService,
  MkIconComponent,
  MkMenuButtonComponent,
  MkMenuByTriggerComponent,
  MkMenuTriggerDirective,
} from '@meerkat-ui';

import { TaskBoard } from '@kraken/domain';

import { ConfirmationModalComponent } from '@kraken/mfr-ui-modals';

@Component({
  selector: 'lib-task-board-more',
  imports: [
    MkIconComponent,
    MkMenuByTriggerComponent,
    MkMenuButtonComponent,
    MkMenuTriggerDirective,
  ],
  templateUrl: './task-board-more.component.html',
  styleUrl: './task-board-more.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskBoardMoreComponent {
  private dialog = inject(MkDialogService);

  private trigger = viewChild(MkMenuTriggerDirective);

  public isOpen = computed(() => !!this.trigger()?.isOpen());

  public board = input.required<TaskBoard>();

  public byRename = output<TaskBoard>();
  public byDelete = output<TaskBoard>();

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
