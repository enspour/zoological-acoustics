import { ChangeDetectionStrategy, Component } from '@angular/core';

import { KuduDotsBoardComponent, KuduWorkspaceComponent } from '@kudu-flow';

@Component({
  selector: 'lib-organization-structure-page',
  imports: [KuduWorkspaceComponent, KuduDotsBoardComponent],
  templateUrl: './organization-structure-page.component.html',
  styleUrl: './organization-structure-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationStructurePageComponent {}
