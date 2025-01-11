import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tr[kudu-tr]',
  imports: [],
  templateUrl: './tr.component.html',
  styleUrl: './tr.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduTableRowComponent {}
