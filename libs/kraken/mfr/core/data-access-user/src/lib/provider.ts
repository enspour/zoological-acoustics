import { UserApi } from './user.api';
import { UserService } from './user.service';

export const provideUserDataAccess = () => [UserApi, UserService];
