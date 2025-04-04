import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { KuduFilterPipe } from '@kudu-ng-utils';

import { KuduDialogService } from '@kudu-ui';

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
  private dialogService = inject(KuduDialogService);
  private projectDataFieldsService = inject(ProjectDataFieldsService);

  public searchTerm = input<string>();

  public dataFields = this.projectDataFieldsService.dataFields;

  public filterFn(value: ProjectDataField, _: number, search: string) {
    return value.name.toLowerCase().includes(search.toLowerCase());
  }

  public onDataFieldClick(field: ProjectDataField) {
    this.dialogService.open(BrowseProjectDataFieldModalComponent, {
      hasBackdrop: true,
      data: {
        field,
      },
    });
  }
}
