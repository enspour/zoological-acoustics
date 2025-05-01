import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { MkTransactionStorage } from './transaction';

@Injectable()
export class MkTransactionService {
  constructor(private transactionStorage: MkTransactionStorage) {}

  public async start<T>(
    dataSource: DataSource,
    callback: () => T | Promise<T>,
  ) {
    const runner = dataSource.createQueryRunner();

    await runner.startTransaction();

    try {
      const result = await this.transactionStorage.run(
        { runner },
        async () => await callback(),
      );

      await runner.commitTransaction();

      return result;
    } catch (err) {
      await runner.rollbackTransaction();
      throw err;
    } finally {
      await runner.release();
    }
  }
}
