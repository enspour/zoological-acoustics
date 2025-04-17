import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'lib-company-page',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './company-page.component.html',
  styleUrl: './company-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyPageComponent {}
