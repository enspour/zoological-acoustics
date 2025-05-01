import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  MkButtonComponent,
  MkIconComponent,
  MkInputComponent,
  MkInputContainerComponent,
} from '@meerkat-ui';

import { AuthService } from '@octo/mfr-data-access-auth';

@Component({
  selector: 'lib-signup-page',
  imports: [
    ReactiveFormsModule,
    MkInputComponent,
    MkInputContainerComponent,
    MkButtonComponent,
    MkIconComponent,
  ],
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
