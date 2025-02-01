import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'div[kudu-editable]',
  imports: [],
  templateUrl: './editable.component.html',
  styleUrl: './editable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[contentEditable]': '!disabled()',
  },
})
export class KuduEditableComponent {
  public disabled = input(false);
}
