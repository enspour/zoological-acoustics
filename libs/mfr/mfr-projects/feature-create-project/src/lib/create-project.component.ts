import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { KuduButtonComponent, KuduInputComponent } from '@kudu-ui';

import { ProjectsService } from '@kudu/data-access-projects';

@Component({
  selector: 'lib-create-project',
  imports: [ReactiveFormsModule, KuduInputComponent, KuduButtonComponent],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectComponent {
  private fb = inject(FormBuilder);
  private projectsService = inject(ProjectsService);

  public form = this.fb.nonNullable.group({
    name: this.fb.nonNullable.control('', [Validators.required]),
  });

  public async create() {
    const data = this.form.getRawValue();
    await this.projectsService.create(data);
  }
}
