import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'lib-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  private sidebar = inject(LayoutComponent);

  @HostListener('click')
  public onToggle() {
    this.sidebar.toggle();
  }
}
