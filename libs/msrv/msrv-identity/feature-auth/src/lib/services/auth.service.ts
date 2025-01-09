import { Injectable, NotFoundException } from '@nestjs/common';

import { BadRequestError, CreatableUser } from '@kudu/domain';
import { UserCredentialsService, UsersService } from '@kudu/msrv-feature-users';
import { comparePassword, hashPassword } from '@kudu/msrv-util-password';

import { AuthTokensService } from './auth-tokens.service';

import { RefreshTokenPayload } from '../interfaces';

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
      throw new BadRequestError(
        'Пользователь с таким логином и паролем не существует!',
      );
    }

    const isEqual = await comparePassword(password, credentials.hashedPassword);

    if (!isEqual) {
      throw new BadRequestError(
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

    const user = await this.usersService.create({
      ...data,
      credentials: {
        username,
        hashedPassword,
      },
    });

    const accessToken = this.authTokensService.issueAccessToken(user);
    const refreshToken = this.authTokensService.issueRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async refresh(token: string) {
    const payload = this.authTokensService.verify<RefreshTokenPayload>(token);

    if (!payload) {
      throw new BadRequestError('Токен истек!');
    }

    const user = await this.usersService.get(payload.sub);

    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }

    const accessToken = this.authTokensService.issueAccessToken(user);
    const refreshToken = this.authTokensService.issueRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }
}
