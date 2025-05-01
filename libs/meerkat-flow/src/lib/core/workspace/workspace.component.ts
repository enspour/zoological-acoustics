import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import {
  MkFlowWorkspaceDirective,
  MkFlowWorkspaceInteractionDirective,
} from './directives';

@Component({
  selector: 'mk-flow-workspace',
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss',
  hostDirectives: [
    {
      directive: MkFlowWorkspaceDirective,
      inputs: ['scroll', 'scale'],
      outputs: ['scrollChange', 'scaleChange'],
    },
    MkFlowWorkspaceInteractionDirective,
  ],
  host: {
    tabindex: '1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkFlowWorkspaceComponent {
  private workspace = inject(MkFlowWorkspaceDirective);
  private workspaceInteraction = inject(MkFlowWorkspaceInteractionDirective);

  public scroll = this.workspace.scroll;
  public scale = this.workspace.scale;

  public isInteracting = this.workspaceInteraction.isInteracting;

  @HostBinding('class.interacting')
  public get IsInteracting() {
    return this.isInteracting();
  }
}
