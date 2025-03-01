import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input,
} from '@angular/core';

import { KuduWorkspaceDirective } from '../../workspace';

@Component({
  selector: 'kudu-dots-board',
  templateUrl: './dots-board.component.html',
  styleUrls: ['./dots-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduDotsBoardComponent {
  private workspaceDirective = inject(KuduWorkspaceDirective);

  public size = input(10);

  private scale = this.workspaceDirective.scale;
  private scroll = this.workspaceDirective.scroll;

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
