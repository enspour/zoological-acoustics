import { Module } from '@nestjs/common';

import { UsersModule } from '@kong/msrv-feature-users';

import { AuthTokensService } from './services/auth-tokens.service';
import { AuthService } from './services/auth.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService, AuthTokensService],
  exports: [AuthService, AuthTokensService],
})
export class AuthModule {}
