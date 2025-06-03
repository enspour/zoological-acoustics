import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MkMenuComponent, MkMenuLinkComponent } from '@meerkat-ui';

@Component({
  selector: 'lib-project-settings-page',
  imports: [RouterOutlet, MkMenuLinkComponent, MkMenuComponent],
  templateUrl: './project-settings-page.component.html',
  styleUrl: './project-settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSettingsPageComponent {}
