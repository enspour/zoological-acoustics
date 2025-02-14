import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-logs-tab',
  imports: [CommonModule],
  templateUrl: './logs-tab.component.html',
  styleUrl: './logs-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogsTabComponent {}
