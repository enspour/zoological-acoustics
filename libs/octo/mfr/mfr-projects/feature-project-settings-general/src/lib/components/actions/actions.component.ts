import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MkButtonComponent, MkDialogService } from '@meerkat-ui';

import { ProjectService } from '@octo/mfr-data-access-project';

import { ProjectsService } from '@octo/mfr-data-access-projects';

import { ConfirmationModalComponent } from '@octo/mfr-ui-modals';

@Component({
  selector: 'lib-actions',
  imports: [MkButtonComponent],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  private router = inject(Router);
  private dialogService = inject(MkDialogService);
  private projectsService = inject(ProjectsService);
  private projectService = inject(ProjectService);

  public onDelete() {
    const project = this.projectService.project();

    if (!project) {
      return;
    }

    const dialogRef = this.dialogService.open(ConfirmationModalComponent, {
      hasBackdrop: true,
      data: {
        title: 'Удаление проекта',
        description: `Вы уверены, что хотите удалить проект "${project.name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe(async (isConfirm) => {
      if (isConfirm) {
        await this.projectsService.delete(project.uuid);
        this.router.navigateByUrl('/projects');
      }
    });
  }
}
