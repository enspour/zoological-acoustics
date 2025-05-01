import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MkFilterPipe } from '@meerkat-ng-utils';

import { MkSortConfig } from '@meerkat-ui';

import { Project } from '@octo/domain';

import { ProjectsService } from '@octo/mfr-data-access-projects';

import { ProjectTableComponent } from '@octo/mfr-ui-project';

import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'lib-projects-page',
  imports: [MkFilterPipe, ProjectTableComponent, HeaderComponent],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private projectsService = inject(ProjectsService);

  public projects = this.projectsService.projects;

  public searchTerm = input<string>();

  public sortBy = input<MkSortConfig['by']>();
  public sortOrder = input<MkSortConfig['order']>();

  public sortConfig = linkedSignal(() => {
    const sortBy = this.sortBy();
    const sortOrder = this.sortOrder();
    return sortBy && sortOrder ? { by: sortBy, order: sortOrder } : undefined;
  });

  public onClickProject(project: Project) {
    this.router.navigateByUrl(`/projects/${project.uuid}`);
  }

  public onSortConfigChange(config?: MkSortConfig) {
    const queryParams = {
      ...this.route.snapshot.queryParams,
      sortBy: config?.by,
      sortOrder: config?.order,
    };

    this.router.navigate([], { queryParams, relativeTo: this.route });
  }

  public filterFn(search: string) {
    return (value: Project) =>
      value.name.toLowerCase().includes(search.toLowerCase());
  }
}
