import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MkDialogService, MkIconComponent } from '@meerkat-ui';

import { Project } from '@kraken/domain';

import {
  ProjectMembersService,
  ProjectService,
} from '@kraken/mfr-data-access-project';

import { ProjectsService } from '@kraken/mfr-data-access-projects';

import { BrowseProjectAccessModalComponent } from '@kraken/mfr-feature-browse-project-access';

import { TabLinkComponent, TabsComponent } from '@kraken/mfr-ui-kit';

import { EmployeeAvatarsComponent } from '@kraken/mfr-ui-employee';
import { ProjectMoreComponent } from '@kraken/mfr-ui-project';

import { UniqueComponent } from '@kraken/mfr-util-unique-component';

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
