import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  MkAutofocusDirective,
  mkDialogData,
  MkInputComponent,
  MkInputContainerComponent,
} from '@meerkat-ui';

import { DialogData } from './browse-project-data-field-modal.interface';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'lib-browse-project-data-field-modal',
  imports: [
    ReactiveFormsModule,
    MkInputComponent,
    MkInputContainerComponent,
    MkAutofocusDirective,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './browse-project-data-field-modal.component.html',
  styleUrl: './browse-project-data-field-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseProjectDataFieldModalComponent {
  private fb = inject(FormBuilder);
  private dialogData = inject<DialogData>(mkDialogData);

  public field = this.dialogData.field;

  public form = this.fb.nonNullable.group({
    name: this.fb.nonNullable.control(this.field.name, [Validators.required]),
  });
}
