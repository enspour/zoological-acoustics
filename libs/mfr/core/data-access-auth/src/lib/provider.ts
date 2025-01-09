import { AuthApi } from './auth.api';
import { AuthService } from './auth.service';

export const provideAuthDataAccess = () => {
  return [AuthApi, AuthService];
};
