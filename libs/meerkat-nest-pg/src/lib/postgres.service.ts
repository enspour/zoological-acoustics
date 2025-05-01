import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { MkTransactionStorage } from './transaction/transaction';
import { MkTransactionService } from './transaction/transaction.service';

@Injectable()
export class MkPostgresService {
  constructor(
    private transactionStorage: MkTransactionStorage,
    private transactionService: MkTransactionService,
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
