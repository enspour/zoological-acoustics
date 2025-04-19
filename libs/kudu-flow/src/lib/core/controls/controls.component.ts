import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { KuduFlowWorkspaceDirective } from '../workspace';

@Component({
  selector: 'kudu-flow-controls',
  imports: [DecimalPipe, NgTemplateOutlet],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduFlowControlsComponent {
  private workspace = inject(KuduFlowWorkspaceDirective);

  public scale = this.workspace.scale;
  public scroll = this.workspace.scroll;

  public onScaleIncrease() {
    this.workspace.scaleTo(this.scale() + 0.1);
  }

  public onScaleDecrease() {
    this.workspace.scaleTo(this.scale() - 0.1);
  }

  public onScaleReset() {
    this.workspace.setScale(1);
  }

  public onScrollReset() {
    this.workspace.scrollBack();
  }
}
