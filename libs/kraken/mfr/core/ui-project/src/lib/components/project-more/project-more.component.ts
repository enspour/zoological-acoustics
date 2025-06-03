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

import { Project } from '@kraken/domain';

import { ConfirmationModalComponent } from '@kraken/mfr-ui-modals';

@Component({
  selector: 'lib-project-more',
  imports: [
    MkIconComponent,
    MkMenuByTriggerComponent,
    MkMenuButtonComponent,
    MkMenuTriggerDirective,
  ],
  templateUrl: './project-more.component.html',
  styleUrl: './project-more.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectMoreComponent {
  private dialogService = inject(MkDialogService);

  private trigger = viewChild(MkMenuTriggerDirective);

  public isOpen = computed(() => !!this.trigger()?.isOpen());

  public project = input.required<Project>();

  public byRename = output<Project>();
  public byDelete = output<Project>();

  public onRename() {
    this.byRename.emit(this.project());
  }

  public onDelete() {
    const dialogRef = this.dialogService.open(ConfirmationModalComponent, {
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
