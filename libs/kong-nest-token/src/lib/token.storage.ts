import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';

import { KongAccessTokenPayload } from '@kong-domain';

@Injectable()
export class KongTokenStorage extends AsyncLocalStorage<KongAccessTokenPayload> {}
