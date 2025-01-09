import { AsyncLocalStorage } from 'node:async_hooks';

import { QueryRunner } from 'typeorm';

export interface Transaction {
  runner: QueryRunner;
}

export class TransactionStorage extends AsyncLocalStorage<Transaction> {}
