import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-tabs',
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {}
