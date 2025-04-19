import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import {
  KuduFlowWorkspaceDirective,
  KuduFlowWorkspaceInteractionDirective,
} from './directives';

@Component({
  selector: 'kudu-flow-workspace',
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss',
  hostDirectives: [
    {
      directive: KuduFlowWorkspaceDirective,
      inputs: ['scroll', 'scale'],
      outputs: ['scrollChange', 'scaleChange'],
    },
    KuduFlowWorkspaceInteractionDirective,
  ],
  host: {
    tabindex: '1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduFlowWorkspaceComponent {
  private workspace = inject(KuduFlowWorkspaceDirective);
  private workspaceInteraction = inject(KuduFlowWorkspaceInteractionDirective);

  public scroll = this.workspace.scroll;
  public scale = this.workspace.scale;

  public isInteracting = this.workspaceInteraction.isInteracting;

  @HostBinding('class.interacting')
  public get IsInteracting() {
    return this.isInteracting();
  }
}
