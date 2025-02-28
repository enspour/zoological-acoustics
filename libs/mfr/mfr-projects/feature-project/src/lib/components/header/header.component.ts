import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { KuduDialogService, KuduIconComponent } from '@kudu-ui';

import { Project } from '@kudu/domain';

import { ProjectsService } from '@kudu/mfr-data-access-projects';

import { ProjectSettingsModalComponent } from '@kudu/mfr-feature-project-settings';

import { TabLinkComponent, TabsComponent } from '@kudu/mfr-ui-kit';
import { ProjectMoreComponent } from '@kudu/mfr-ui-project';

import { ProjectPageComponent } from '../../project-page.component';

@Component({
  selector: 'lib-header',
  imports: [
    KuduIconComponent,
    TabsComponent,
    TabLinkComponent,
    ProjectMoreComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private router = inject(Router);
  private dialogService = inject(KuduDialogService);
  private projectsService = inject(ProjectsService);
  private page = inject(ProjectPageComponent);

  public project = this.page.project;

  public onOpenSettings() {
    const project = this.project();

    if (!project) {
      return;
    }

    this.dialogService.open(ProjectSettingsModalComponent, {
      data: {
        uuid: project.uuid,
      },
      hasBackdrop: true,
    });
  }

  public onRename(project: Project) {
    console.log('on rename', project);
  }

  public async onDelete(project: Project) {
    await this.projectsService.delete(project.uuid);
    this.router.navigateByUrl('/projects');
  }
}
