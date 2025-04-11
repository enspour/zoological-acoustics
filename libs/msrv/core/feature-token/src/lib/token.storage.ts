import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';

import { AccessTokenPayload } from '@kudu/domain';

@Injectable()
export class TokenStorage extends AsyncLocalStorage<AccessTokenPayload> {}
