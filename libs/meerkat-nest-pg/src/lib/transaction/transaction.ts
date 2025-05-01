import { AsyncLocalStorage } from 'node:async_hooks';

import { QueryRunner } from 'typeorm';

export interface MkTransaction {
  runner: QueryRunner;
}

export class MkTransactionStorage extends AsyncLocalStorage<MkTransaction> {}
