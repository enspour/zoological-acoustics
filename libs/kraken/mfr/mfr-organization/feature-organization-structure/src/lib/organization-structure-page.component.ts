import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  MkFlowControlsComponent,
  MkFlowDotsBackgroundComponent,
  MkFlowWorkspaceComponent,
} from '@meerkat-flow';

@Component({
  selector: 'lib-organization-structure-page',
  imports: [
    MkFlowControlsComponent,
    MkFlowDotsBackgroundComponent,
    MkFlowWorkspaceComponent,
  ],
  templateUrl: './organization-structure-page.component.html',
  styleUrl: './organization-structure-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationStructurePageComponent {}
