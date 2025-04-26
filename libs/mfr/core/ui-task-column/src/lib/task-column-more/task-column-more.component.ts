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
  KuduColorPaletteComponent,
  KuduDialogService,
  KuduIconComponent,
  KuduMenuButtonComponent,
  KuduMenuByTriggerComponent,
  KuduMenuTriggerDirective,
  KuduSizeDirective,
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
    KuduColorPaletteComponent,
    KuduSizeDirective,
  ],
  templateUrl: './task-column-more.component.html',
  styleUrl: './task-column-more.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskColumnMoreComponent {
  private dialog = inject(KuduDialogService);

  private trigger = viewChild(KuduMenuTriggerDirective);

  public isOpen = computed(() => !!this.trigger()?.isOpen());

  public column = input.required<TaskColumn>();

  public colors = [
    '#4dabf7',
    '#69db7c',
    '#38d9a9',
    '#ffd43b',
    '#ffa94d',
    '#f06595',
    '#9775fa',
    '#7b869e',
  ];

  public byRename = output<TaskColumn>();
  public byDelete = output<TaskColumn>();

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
