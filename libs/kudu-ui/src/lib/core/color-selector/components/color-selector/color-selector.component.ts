import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kudu-color-selector',
  imports: [],
  templateUrl: './color-selector.component.html',
  styleUrl: './color-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduColorSelectorComponent {}
