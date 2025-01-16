import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KuduFilterPipe } from '@kudu-template-utils';

import { Project } from '@kudu/domain';

import {
  KuduButtonComponent,
  KuduIconComponent,
  KuduInputComponent,
} from '@kudu-ui';

import { ProjectsService } from '@kudu/data-access-projects';

import { BrowseProjectComponent } from '@kudu/feature-browse-project';
import { CreateProjectComponent } from '@kudu/feature-create-project';
import { ExplorerService } from '@kudu/mfr-feature-explorer';

import { ProjectTableComponent } from '@kudu/mfr-ui-project';

@Component({
  selector: 'lib-projects-page',
  imports: [
    FormsModule,
    KuduButtonComponent,
    KuduIconComponent,
    KuduInputComponent,
    KuduFilterPipe,
    ProjectTableComponent,
  ],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent implements OnInit {
  private explorerService = inject(ExplorerService);
  private projectsService = inject(ProjectsService);

  public projects = this.projectsService.projects;

  public searchedTerm = signal('');

  ngOnInit(): void {
    this.projectsService.reload();
  }

  public onCreateProject() {
    this.explorerService.open({
      component: CreateProjectComponent,
    });
  }

  public onClickProject(project: Project) {
    this.explorerService.open({
      component: BrowseProjectComponent,
      inputs: {
        project,
      },
    });
  }

  public filterFn(value: Project, _: number, search: string) {
    return value.name.includes(search);
  }
}
