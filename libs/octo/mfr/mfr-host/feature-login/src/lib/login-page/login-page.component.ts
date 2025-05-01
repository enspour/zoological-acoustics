import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  MkButtonComponent,
  MkIconComponent,
  MkInputComponent,
  MkInputContainerComponent,
} from '@meerkat-ui';

import { AuthService } from '@kong-ng';

@Component({
  selector: 'lib-login-page',
  imports: [
    ReactiveFormsModule,
    MkInputComponent,
    MkInputContainerComponent,
    MkButtonComponent,
    MkIconComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  public form = this.fb.nonNullable.group({
    username: this.fb.nonNullable.control('', [Validators.required]),
    password: this.fb.nonNullable.control('', [Validators.required]),
  });

  public async onSubmit() {
    const { username, password } = this.form.getRawValue();
    const response = await this.authService.login(username, password);

    if (response.statusCode === 200) {
      this.router.navigateByUrl('/');
    }
  }
}
