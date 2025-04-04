import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { KuduFilterPipe } from '@kudu-ng-utils';

import { KuduDialogService, KuduSortConfig } from '@kudu-ui';

import { ProjectDataField } from '@kudu/domain';

import { ProjectDataFieldsService } from '@kudu/mfr-data-access-projects-data-fields';

import { BrowseProjectDataFieldModalComponent } from '@kudu/mfr-feature-browse-project-data-field';

import { ProjectDataFieldTableComponent } from '@kudu/mfr-ui-project-data-field';

import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'lib-projects-data-fields-page',
  imports: [KuduFilterPipe, ProjectDataFieldTableComponent, HeaderComponent],
  templateUrl: './projects-data-fields-page.component.html',
  styleUrl: './projects-data-fields-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsDataFieldsPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialogService = inject(KuduDialogService);
  private projectDataFieldsService = inject(ProjectDataFieldsService);

  public searchTerm = input<string>();

  public sortBy = input<KuduSortConfig['by']>();
  public sortOrder = input<KuduSortConfig['order']>();

  public sortConfig = linkedSignal(() => {
    const sortBy = this.sortBy();
    const sortOrder = this.sortOrder();
    return sortBy && sortOrder ? { by: sortBy, order: sortOrder } : undefined;
  });

  public dataFields = this.projectDataFieldsService.dataFields;

  public onDataFieldClick(field: ProjectDataField) {
    this.dialogService.open(BrowseProjectDataFieldModalComponent, {
      hasBackdrop: true,
      data: {
        field,
      },
    });
  }

  public onSortConfigChange(config?: KuduSortConfig) {
    const queryParams = {
      ...this.route.snapshot.queryParams,
      sortBy: config?.by,
      sortOrder: config?.order,
    };

    this.router.navigate([`/projects/settings/data-fields`], { queryParams });
  }

  public filterFn(value: ProjectDataField, _: number, search: string) {
    return value.name.toLowerCase().includes(search.toLowerCase());
  }
}
