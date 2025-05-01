import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input,
} from '@angular/core';

import { MkFlowWorkspaceDirective } from '../../workspace';

@Component({
  selector: 'mk-flow-dots-background',
  templateUrl: './dots-background.component.html',
  styleUrls: ['./dots-background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkFlowDotsBackgroundComponent {
  private workspace = inject(MkFlowWorkspaceDirective);

  public size = input(10);

  private scale = this.workspace.scale;
  private scroll = this.workspace.scroll;

  @HostBinding('style.background-size')
  get Size() {
    const size = this.size() * 2 * this.scale();
    return `${size}px ${size}px`;
  }

  @HostBinding('style.background-position')
  get Position() {
    const { x, y } = this.scroll();
    return `left ${x}px top ${y}px`;
  }

  @HostBinding('style.background-image')
  get Image() {
    const size = this.size() * this.scale();

    return `radial-gradient(
      circle at ${size}px ${size}px, 
      rgb(218, 224, 228) ${this.scale()}px, 
      transparent 0px
    )`;
  }
}
