import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
} from '@angular/core';

@Component({
  selector: 'div[mk-editable]',
  imports: [],
  templateUrl: './editable.component.html',
  styleUrl: './editable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[contentEditable]': '!disabled()',
    '[attr.placeholder]': 'placeholder()',
  },
})
export class MkEditableComponent {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public disabled = input(false);
  public placeholder = input('');

  public getValue() {
    return this.elementRef.nativeElement.innerText;
  }
}
