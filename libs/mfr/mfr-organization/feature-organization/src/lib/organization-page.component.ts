import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'lib-organization-page',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './organization-page.component.html',
  styleUrl: './organization-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationPageComponent {}
