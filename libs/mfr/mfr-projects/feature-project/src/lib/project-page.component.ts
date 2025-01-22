import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  resource,
} from '@angular/core';

import {
  KuduTabComponent,
  KuduTabContentDirective,
  KuduTabsComponent,
} from '@kudu-ui';

import { provideGanttDataAccess } from '@kudu/mfr-data-access-gantt';
import { ProjectService } from '@kudu/mfr-data-access-project';

import { GanttComponent } from '@kudu/mfr-feature-gantt';

import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'lib-project-page',
  imports: [
    GanttComponent,
    HeaderComponent,
    KuduTabsComponent,
    KuduTabComponent,
    KuduTabContentDirective,
  ],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideGanttDataAccess()],
})
export class ProjectPageComponent {
  private projectService = inject(ProjectService);

  public uuid = input.required<string>();

  private resource = resource({
    request: () => this.uuid(),
    loader: async ({ request }) => {
      return await this.projectService.getByUuid(request);
    },
  });

  public project = this.resource.value;
  public error = this.resource.error;
  public isLoading = this.resource.isLoading;
}
