import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'lib-projects-settings-page',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './projects-settings-page.component.html',
  styleUrl: './projects-settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSettingsPageComponent {}
