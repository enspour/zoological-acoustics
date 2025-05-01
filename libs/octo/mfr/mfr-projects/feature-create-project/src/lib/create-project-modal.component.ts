import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  MkAutofocusDirective,
  MkButtonComponent,
  MkDialogRef,
  MkIconComponent,
  MkInputComponent,
  MkInputContainerComponent,
} from '@meerkat-ui';

import { ProjectsService } from '@octo/mfr-data-access-projects';

@Component({
  selector: 'lib-create-project-modal',
  imports: [
    ReactiveFormsModule,
    MkInputComponent,
    MkInputContainerComponent,
    MkButtonComponent,
    MkAutofocusDirective,
    MkIconComponent,
  ],
  templateUrl: './create-project-modal.component.html',
  styleUrl: './create-project-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectModalComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MkDialogRef);
  private projectsService = inject(ProjectsService);

  public form = this.fb.nonNullable.group({
    name: this.fb.nonNullable.control('', [Validators.required]),
  });

  public onClose() {
    this.dialogRef.close();
  }

  public async onCreate() {
    const data = this.form.getRawValue();
    const project = await this.projectsService.create(data);
    this.dialogRef.close(project);
  }
}
