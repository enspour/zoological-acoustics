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
  KuduDialogService,
  KuduIconComponent,
  KuduMenuButtonComponent,
  KuduMenuByTriggerComponent,
  KuduMenuTriggerDirective,
} from '@kudu-ui';

import { Task } from '@kudu/domain';

import { ConfirmationModalComponent } from '@kudu/mfr-ui-modals';

@Component({
  selector: 'lib-task-more',
  imports: [
    KuduIconComponent,
    KuduMenuByTriggerComponent,
    KuduMenuButtonComponent,
    KuduMenuTriggerDirective,
  ],
  templateUrl: './task-more.component.html',
  styleUrl: './task-more.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskMoreComponent {
  private dialog = inject(KuduDialogService);

  private trigger = viewChild(KuduMenuTriggerDirective);

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
