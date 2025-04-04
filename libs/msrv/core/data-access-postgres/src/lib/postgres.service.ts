import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { TransactionStorage } from './transaction/transaction';
import { TransactionService } from './transaction/transaction.service';

@Injectable()
export class PostgresService {
  constructor(
    private transactionStorage: TransactionStorage,
    private transactionService: TransactionService,
    private dataSource: DataSource,
  ) {}

  public get Manager() {
    return this.dataSource.manager;
  }

  public get ManagerInTransaction() {
    const store = this.transactionStorage.getStore();

    if (store) {
      return store.runner.manager;
    }

    return this.Manager;
  }

  public startTransaction<T>(callback: () => T | Promise<T>) {
    return this.transactionService.start(this.dataSource, callback);
  }
}
