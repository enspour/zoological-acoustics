import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';

import { Router } from '@angular/router';

import {
  KuduDialogService,
  KuduIconComponent,
  KuduMenuButtonComponent,
  KuduMenuByTriggerComponent,
  KuduMenuTriggerDirective,
} from '@kudu-ui';

import { ProjectsService } from '@kudu/mfr-data-access-projects';

import { ConfirmationModalComponent } from '@kudu/mfr-ui-modals';

import { ProjectPageComponent } from '../../project-page.component';

@Component({
  selector: 'lib-header-more',
  imports: [
    KuduIconComponent,
    KuduMenuButtonComponent,
    KuduMenuByTriggerComponent,
  ],
  templateUrl: './header-more.component.html',
  styleUrl: './header-more.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [KuduMenuTriggerDirective],
})
export class HeaderMoreComponent {
  private router = inject(Router);
  private dialog = inject(KuduDialogService);
  private page = inject(ProjectPageComponent);
  private projectsService = inject(ProjectsService);

  public trigger = inject(KuduMenuTriggerDirective);

  public project = this.page.project;

  public isOpen = signal(false);

  public onToggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  public onRemove() {
    const project = this.project();

    if (!project) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
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
