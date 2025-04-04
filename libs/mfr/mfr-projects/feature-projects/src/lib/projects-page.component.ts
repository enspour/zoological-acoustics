import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { KuduFilterPipe } from '@kudu-ng-utils';

import { KuduSortConfig } from '@kudu-ui';

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
  private route = inject(ActivatedRoute);
  private projectsService = inject(ProjectsService);

  public projects = this.projectsService.projects;

  public searchTerm = input<string>();

  public sortBy = input<KuduSortConfig['by']>();
  public sortOrder = input<KuduSortConfig['order']>();

  public sortConfig = linkedSignal(() => {
    const sortBy = this.sortBy();
    const sortOrder = this.sortOrder();
    return sortBy && sortOrder ? { by: sortBy, order: sortOrder } : undefined;
  });

  public onClickProject(project: Project) {
    this.router.navigateByUrl(`/projects/${project.uuid}/gantt`);
  }

  public onSortConfigChange(config?: KuduSortConfig) {
    const queryParams = {
      ...this.route.snapshot.queryParams,
      sortBy: config?.by,
      sortOrder: config?.order,
    };

    this.router.navigate([`/projects`], { queryParams });
  }

  public filterFn(value: Project, _: number, search: string) {
    return value.name.toLowerCase().includes(search.toLowerCase());
  }
}
