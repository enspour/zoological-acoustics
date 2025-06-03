import { inject, Injectable, resource } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { KongAuthService } from '@kong-ng';

import { UserApi } from './user.api';

@Injectable()
export class UserService {
  private userApi = inject(UserApi);
  private authService = inject(KongAuthService);

  private response = resource({
    request: () => this.authService.auth(),
    loader: async ({ request }) => {
      if (request) {
        const uuid = request.token.payload.sub;
        const response = this.userApi.getUser(uuid);
        return await lastValueFrom(response);
      }

      return null;
    },
  });

  public user = this.response.value;
  public error = this.response.error;
  public isLoading = this.response.isLoading;
}
