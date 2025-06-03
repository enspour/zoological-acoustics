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

import { Task } from '@kraken/domain';

import { ConfirmationModalComponent } from '@kraken/mfr-ui-modals';

@Component({
  selector: 'lib-task-more',
  imports: [
    MkIconComponent,
    MkMenuByTriggerComponent,
    MkMenuButtonComponent,
    MkMenuTriggerDirective,
  ],
  templateUrl: './task-more.component.html',
  styleUrl: './task-more.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskMoreComponent {
  private dialog = inject(MkDialogService);

  private trigger = viewChild(MkMenuTriggerDirective);

  public isOpen = computed(() => !!this.trigger()?.isOpen());

  public task = input.required<Task>();

  public byRename = output<Task>();
  public byDelete = output<Task>();

  public onRename() {
    this.byRename.emit(this.task());
  }

  public async onDelete() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      hasBackdrop: true,
      data: {
        title: 'Удаление доски',
        description: `Вы уверены, что хотите удалить доску "${this.task().title}"?`,
      },
    });

    dialogRef.afterClosed().subscribe(async (isConfirm) => {
      if (isConfirm) {
        this.byDelete.emit(this.task());
      }
    });
  }
}
