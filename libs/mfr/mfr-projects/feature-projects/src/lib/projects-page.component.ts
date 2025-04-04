import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';

import { KuduFilterPipe } from '@kudu-ng-utils';

import { Project } from '@kudu/domain';

import { ProjectsService } from '@kudu/mfr-data-access-projects';

import { ProjectTableComponent } from '@kudu/mfr-ui-project';

import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'lib-projects-page',
  imports: [KuduFilterPipe, ProjectTableComponent, HeaderComponent],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent {
  private router = inject(Router);
  private projectsService = inject(ProjectsService);

  public projects = this.projectsService.projects;

  public searchTerm = input<string>();

  public onClickProject(project: Project) {
    this.router.navigateByUrl(`/projects/${project.uuid}/gantt`);
  }

  public filterFn(value: Project, _: number, search: string) {
    return value.name.toLowerCase().includes(search.toLowerCase());
  }
}
