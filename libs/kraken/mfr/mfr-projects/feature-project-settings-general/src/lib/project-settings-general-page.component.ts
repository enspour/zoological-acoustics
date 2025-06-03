import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MkIconComponent,
  MkInputComponent,
  MkInputContainerComponent,
} from '@meerkat-ui';

import { ProjectService } from '@kraken/mfr-data-access-project';

import { ActionsComponent } from './components/actions/actions.component';

@Component({
  selector: 'lib-project-settings-general-page',
  imports: [
    FormsModule,
    MkInputComponent,
    MkInputContainerComponent,
    ActionsComponent,
    MkIconComponent,
  ],
  templateUrl: './project-settings-general-page.component.html',
  styleUrl: './project-settings-general-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSettingsGeneralPageComponent {
  private projectService = inject(ProjectService);

  public name = linkedSignal(() => this.projectService.project()?.name || '');
}
