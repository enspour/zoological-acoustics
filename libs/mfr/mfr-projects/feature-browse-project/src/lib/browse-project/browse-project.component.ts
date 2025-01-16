import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { Project } from '@kudu/domain';

import { KuduButtonComponent, KuduDialogService } from '@kudu-ui';

import { ProjectsService } from '@kudu/data-access-projects';

import { ConfirmationModalComponent } from '@kudu/mfr-ui-modals';

@Component({
  selector: 'lib-browse-project',
  imports: [KuduButtonComponent],
  templateUrl: './browse-project.component.html',
  styleUrl: './browse-project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseProjectComponent {
  private dialogService = inject(KuduDialogService);
  private projectsService = inject(ProjectsService);

  public project = input.required<Project>();

  public onDeleteProject() {
    const dialogRef = this.dialogService.open(ConfirmationModalComponent, {
      hasBackdrop: true,
      data: {
        title: 'Удаление проекта',
        description: 'Вы уверены, что хотите удалить проект?',
      },
    });

    dialogRef.afterClosed().subscribe(async (isConfirm) => {
      if (isConfirm) {
        await this.projectsService.delete(this.project().uuid);
      }
    });
  }
}
