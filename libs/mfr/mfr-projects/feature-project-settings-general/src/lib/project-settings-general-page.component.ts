import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  KuduIconComponent,
  KuduInputComponent,
  KuduInputContainerComponent,
} from '@kudu-ui';

import { ProjectService } from '@kudu/mfr-data-access-project';

import { ActionsComponent } from './components/actions/actions.component';

@Component({
  selector: 'lib-project-settings-general-page',
  imports: [
    FormsModule,
    KuduInputComponent,
    KuduInputContainerComponent,
    ActionsComponent,
    KuduIconComponent,
  ],
  templateUrl: './project-settings-general-page.component.html',
  styleUrl: './project-settings-general-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSettingsGeneralPageComponent {
  private projectService = inject(ProjectService);

  public name = linkedSignal(() => this.projectService.project()?.name || '');
}
