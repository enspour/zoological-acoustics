import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-logs-tab',
  imports: [],
  templateUrl: './logs-tab.component.html',
  styleUrl: './logs-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogsTabComponent {}
