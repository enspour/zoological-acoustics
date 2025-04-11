import { ChangeDetectionStrategy, Component } from '@angular/core';

import { KuduInputComponent, KuduInputContainerComponent } from '@kudu-ui';

@Component({
  selector: 'lib-project-settings-general-page',
  imports: [KuduInputComponent, KuduInputContainerComponent],
  templateUrl: './project-settings-general-page.component.html',
  styleUrl: './project-settings-general-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSettingsGeneralPageComponent {}
