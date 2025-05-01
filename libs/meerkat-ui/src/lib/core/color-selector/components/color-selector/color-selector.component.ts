import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mk-color-selector',
  imports: [],
  templateUrl: './color-selector.component.html',
  styleUrl: './color-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkColorSelectorComponent {}
