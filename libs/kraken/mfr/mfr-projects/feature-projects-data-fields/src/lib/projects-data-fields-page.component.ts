import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MkFilterPipe } from '@meerkat-ng-utils';

import { MkDialogService, MkSortConfig } from '@meerkat-ui';

import { ProjectDataField } from '@kraken/domain';

import { ProjectDataFieldsService } from '@kraken/mfr-data-access-projects-data-fields';

import { BrowseProjectDataFieldModalComponent } from '@kraken/mfr-feature-browse-project-data-field';

import { ProjectDataFieldTableComponent } from '@kraken/mfr-ui-project-data-field';

import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'lib-projects-data-fields-page',
  imports: [MkFilterPipe, ProjectDataFieldTableComponent, HeaderComponent],
  templateUrl: './projects-data-fields-page.component.html',
  styleUrl: './projects-data-fields-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsDataFieldsPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialogService = inject(MkDialogService);
  private projectDataFieldsService = inject(ProjectDataFieldsService);

  public searchTerm = input<string>();

  public sortBy = input<MkSortConfig['by']>();
  public sortOrder = input<MkSortConfig['order']>();

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
      minWidth: '400px',
    });
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
    return (value: ProjectDataField) =>
      value.name.toLowerCase().includes(search.toLowerCase());
  }
}
