import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MkDialogService, MkIconComponent } from '@meerkat-ui';

import { Project } from '@octo/domain';

import {
  ProjectMembersService,
  ProjectService,
} from '@octo/mfr-data-access-project';

import { ProjectsService } from '@octo/mfr-data-access-projects';

import { BrowseProjectAccessModalComponent } from '@octo/mfr-feature-browse-project-access';

import { TabLinkComponent, TabsComponent } from '@octo/mfr-ui-kit';

import { EmployeeAvatarsComponent } from '@octo/mfr-ui-employee';
import { ProjectMoreComponent } from '@octo/mfr-ui-project';

import { UniqueComponent } from '@octo/mfr-util-unique-component';

@Component({
  selector: 'lib-header',
  imports: [
    MkIconComponent,
    TabsComponent,
    TabLinkComponent,
    ProjectMoreComponent,
    EmployeeAvatarsComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends UniqueComponent {
  private router = inject(Router);
  private dialogService = inject(MkDialogService);
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
