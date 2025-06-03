import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MkAutofocusDirective, MkIconComponent } from '@meerkat-ui';

@Component({
  selector: 'lib-textfield-editable',
  imports: [FormsModule, MkIconComponent, MkAutofocusDirective],
  templateUrl: './textfield-editable.component.html',
  styleUrl: './textfield-editable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextfieldEditableComponent {
  public isEdit = model<boolean>(false);

  public value = input('');
  public placeholder = input('');

  public byEdit = output<string>();

  public onClose() {
    this.isEdit.set(false);
  }

  public onEdit(value: string) {
    this.byEdit.emit(value);
    this.isEdit.set(false);
  }
}
