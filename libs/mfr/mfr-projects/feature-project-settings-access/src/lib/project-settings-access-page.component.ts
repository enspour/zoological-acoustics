import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { KuduSortConfig } from '@kudu-ui';

import { ProjectMembersService } from '@kudu/mfr-data-access-project';

import { MembersComponent } from './components/members/members.component';

@Component({
  selector: 'lib-project-settings-access-page',
  imports: [MembersComponent],
  templateUrl: './project-settings-access-page.component.html',
  styleUrl: './project-settings-access-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSettingsAccessPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private projectMembersService = inject(ProjectMembersService);

  public members = this.projectMembersService.members;

  public searchTerm = input<string>();

  public sortBy = input<KuduSortConfig['by']>();
  public sortOrder = input<KuduSortConfig['order']>();

  public sortConfig = linkedSignal(() => {
    const sortBy = this.sortBy();
    const sortOrder = this.sortOrder();
    return sortBy && sortOrder ? { by: sortBy, order: sortOrder } : undefined;
  });

  public onSearchTermChange(searchTerm: string) {
    const queryParams = { ...this.route.snapshot.queryParams, searchTerm };
    this.router.navigate([], { queryParams, relativeTo: this.route });
  }

  public onSortConfigChange(config?: KuduSortConfig) {
    const queryParams = {
      ...this.route.snapshot.queryParams,
      sortBy: config?.by,
      sortOrder: config?.order,
    };

    this.router.navigate([], { queryParams, relativeTo: this.route });
  }
}
