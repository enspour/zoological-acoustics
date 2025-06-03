import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'lib-tab-link',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './tab-link.component.html',
  styleUrl: './tab-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabLinkComponent {
  public href = input.required<string>();
  public exact = input<boolean>(false);
}
