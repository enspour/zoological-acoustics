import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  KuduFlowDotsBoardComponent,
  KuduFlowWorkspaceComponent,
} from '@kudu-flow';

@Component({
  selector: 'lib-integration-page',
  imports: [KuduFlowWorkspaceComponent, KuduFlowDotsBoardComponent],
  templateUrl: './integration-page.component.html',
  styleUrl: './integration-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntegrationPageComponent {}
