import { ChangeDetectionStrategy, Component } from '@angular/core';

import { KuduDotsBoardComponent, KuduWorkspaceComponent } from '@kudu-flow';

@Component({
  selector: 'lib-company-structure-page',
  imports: [KuduWorkspaceComponent, KuduDotsBoardComponent],
  templateUrl: './company-structure-page.component.html',
  styleUrl: './company-structure-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyStructurePageComponent {}
