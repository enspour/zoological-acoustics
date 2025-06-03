import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  MkButtonComponent,
  MkDialogRef,
  MkIconComponent,
  MkInputComponent,
  MkInputContainerComponent,
  MkOptionComponent,
  MkSelectComponent,
} from '@meerkat-ui';

import { ProjectDataFieldType } from '@kraken/domain';

import { ProjectDataFieldsService } from '@kraken/mfr-data-access-projects-data-fields';

import { GetTypeAliasPipe } from '@kraken/mfr-util-project-data-field';

@Component({
  selector: 'lib-create-project-data-field-modal',
  imports: [
    ReactiveFormsModule,
    MkIconComponent,
    MkInputComponent,
    MkInputContainerComponent,
    MkButtonComponent,
    MkSelectComponent,
    MkOptionComponent,
    GetTypeAliasPipe,
  ],
  templateUrl: './create-project-data-field-modal.component.html',
  styleUrl: './create-project-data-field-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectDataFieldModalComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MkDialogRef);
  private projectDataFieldsService = inject(ProjectDataFieldsService);

  public form = this.fb.nonNullable.group({
    name: this.fb.nonNullable.control('', [Validators.required]),
    type: this.fb.nonNullable.control(ProjectDataFieldType.number, [
      Validators.required,
    ]),
  });

  public TYPE = ProjectDataFieldType;

  public types = signal(Object.values(ProjectDataFieldType));

  public onClose() {
    this.dialogRef.close();
  }

  public async onCreate() {
    const data = this.form.getRawValue();
    const field = await this.projectDataFieldsService.create(data);
    this.dialogRef.close(field);
  }
}
