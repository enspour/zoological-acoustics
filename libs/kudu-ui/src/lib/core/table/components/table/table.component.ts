import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'kudu-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduTableComponent<T extends object> {
  public data = input.required<T[]>();
}
