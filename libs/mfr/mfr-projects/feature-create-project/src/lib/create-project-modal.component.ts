import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  KuduAutofocusDirective,
  KuduButtonComponent,
  KuduDialogRef,
  KuduIconComponent,
  KuduInputComponent,
  KuduInputContainerComponent,
} from '@kudu-ui';

import { ProjectsService } from '@kudu/mfr-data-access-projects';

@Component({
  selector: 'lib-create-project-modal',
  imports: [
    ReactiveFormsModule,
    KuduInputComponent,
    KuduInputContainerComponent,
    KuduButtonComponent,
    KuduAutofocusDirective,
    KuduIconComponent,
  ],
  templateUrl: './create-project-modal.component.html',
  styleUrl: './create-project-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectModalComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(KuduDialogRef);
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
