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

import { Project } from '@kudu/domain';

import { ConfirmationModalComponent } from '@kudu/mfr-ui-modals';

@Component({
  selector: 'lib-project-more',
  imports: [
    KuduIconComponent,
    KuduMenuByTriggerComponent,
    KuduMenuButtonComponent,
    KuduMenuTriggerDirective,
  ],
  templateUrl: './project-more.component.html',
  styleUrl: './project-more.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectMoreComponent {
  private dialog = inject(KuduDialogService);

  public project = input.required<Project>();

  public isOpen = signal(false);

  public byRename = output<Project>();
  public byDelete = output<Project>();

  public onToggle() {
    this.isOpen.update((value) => !value);
  }

  public onRename() {
    this.byRename.emit(this.project());
  }

  public onDelete() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      hasBackdrop: true,
      data: {
        title: 'Удаление проекта',
        description: `Вы уверены, что хотите удалить проект "${this.project().name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe(async (isConfirm) => {
      if (isConfirm) {
        this.byDelete.emit(this.project());
      }
    });
  }
}
