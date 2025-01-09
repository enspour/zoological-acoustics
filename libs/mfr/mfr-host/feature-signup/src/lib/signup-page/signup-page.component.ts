import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KuduButtonComponent, KuduInputComponent } from '@kudu-ui';

import { AuthService } from '@kudu/mfr-data-access-auth';

@Component({
  selector: 'lib-signup-page',
  imports: [ReactiveFormsModule, KuduInputComponent, KuduButtonComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPageComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  public form = this.fb.nonNullable.group({
    name: this.fb.nonNullable.control('', [Validators.required]),
    username: this.fb.nonNullable.control('', [Validators.required]),
    password: this.fb.nonNullable.control('', [Validators.required]),
  });

  public async onSubmit() {
    const { username, password, ...rest } = this.form.getRawValue();
    const response = await this.authService.signup(username, password, rest);

    if (response.statusCode === 200) {
      this.router.navigateByUrl('/');
    }
  }
}
