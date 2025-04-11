import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { KuduMenuComponent, KuduMenuLinkComponent } from '@kudu-ui';

@Component({
  selector: 'lib-project-settings-page',
  imports: [RouterOutlet, KuduMenuLinkComponent, KuduMenuComponent],
  templateUrl: './project-settings-page.component.html',
  styleUrl: './project-settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSettingsPageComponent {}
