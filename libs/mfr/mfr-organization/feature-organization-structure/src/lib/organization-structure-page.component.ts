import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  KuduFlowControlsComponent,
  KuduFlowDotsBackgroundComponent,
  KuduFlowWorkspaceComponent,
} from '@kudu-flow';

@Component({
  selector: 'lib-organization-structure-page',
  imports: [
    KuduFlowControlsComponent,
    KuduFlowDotsBackgroundComponent,
    KuduFlowWorkspaceComponent,
  ],
  templateUrl: './organization-structure-page.component.html',
  styleUrl: './organization-structure-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationStructurePageComponent {}
