import { KongAuthApi } from './auth.api';
import { KongAuthService } from './auth.service';

export const provideKongAuthDataAccess = () => {
  return [KongAuthApi, KongAuthService];
};
