import { Injectable } from '@nestjs/common';

import { MkBadRequestError, MkNotFoundError } from '@meerkat-nest-errors';

import { CreatableUser } from '@kong/domain';

import { UserCredentialsService, UsersService } from '@kong/msrv-feature-users';

import { comparePassword, hashPassword } from '@kong/msrv-util-password';

import { AuthTokensService } from './auth-tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private authTokensService: AuthTokensService,
    private usersService: UsersService,
    private userCredentialsService: UserCredentialsService,
  ) {}

  public async login(username: string, password: string) {
    const credentials =
      await this.userCredentialsService.getByUsername(username);

    if (!credentials) {
      throw new MkBadRequestError(
        'Пользователь с таким логином и паролем не существует!',
      );
    }

    const isEqual = await comparePassword(password, credentials.hashedPassword);

    if (!isEqual) {
      throw new MkBadRequestError(
        'Пользователь с таким логином и паролем не существует!',
      );
    }

    const { user } = credentials;

    const accessToken = this.authTokensService.issueAccessToken(user);
    const refreshToken = this.authTokensService.issueRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async signup(username: string, password: string, data: CreatableUser) {
    const hashedPassword = await hashPassword(password);

    const user = await this.usersService.create(data, {
      username,
      hashedPassword,
    });

    const accessToken = this.authTokensService.issueAccessToken(user);
    const refreshToken = this.authTokensService.issueRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async refresh(token: string) {
    const payload = this.authTokensService.verifyRefreshToken(token);

    if (!payload) {
      throw new MkBadRequestError('Токен истек!');
    }

    const user = await this.usersService.get(payload.sub);

    if (!user) {
      throw new MkNotFoundError('Пользователь не найден!');
    }

    const accessToken = this.authTokensService.issueAccessToken(user);
    const refreshToken = this.authTokensService.issueRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }
}
