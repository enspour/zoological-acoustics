import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { KuduDialogService, KuduIconComponent } from '@kudu-ui';

import { Project } from '@kudu/domain';

import {
  ProjectMembersService,
  ProjectService,
} from '@kudu/mfr-data-access-project';

import { ProjectsService } from '@kudu/mfr-data-access-projects';

import { BrowseProjectAccessModalComponent } from '@kudu/mfr-feature-browse-project-access';

import { TabLinkComponent, TabsComponent } from '@kudu/mfr-ui-kit';

import {
  ProjectMemberAvatarsComponent,
  ProjectMoreComponent,
} from '@kudu/mfr-ui-project';

import { UniqueComponent } from '@kudu/mfr-util-unique-component';

@Component({
  selector: 'lib-header',
  imports: [
    KuduIconComponent,
    TabsComponent,
    TabLinkComponent,
    ProjectMoreComponent,
    ProjectMemberAvatarsComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends UniqueComponent {
  private router = inject(Router);
  private dialogService = inject(KuduDialogService);
  private projectsService = inject(ProjectsService);
  private projectService = inject(ProjectService);
  private projectMembersService = inject(ProjectMembersService);

  public project = this.projectService.project;
  public members = this.projectMembersService.members;

  public onRename(project: Project) {
    console.log('on rename', project);
  }

  public async onDelete(project: Project) {
    await this.projectsService.delete(project.uuid);
    this.router.navigateByUrl('/projects');
  }

  public onMembersClick(project: Project) {
    this.dialogService.open(BrowseProjectAccessModalComponent, {
      hasBackdrop: true,
      data: {
        project,
      },
      width: '40%',
      minWidth: '600px',
    });
  }
}
