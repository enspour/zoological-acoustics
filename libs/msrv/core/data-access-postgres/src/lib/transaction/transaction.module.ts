import { Module } from '@nestjs/common';
import { TransactionStorage } from './transaction';
import { TransactionService } from './transaction.service';

@Module({
  providers: [TransactionService, TransactionStorage],
  exports: [TransactionService, TransactionStorage],
})
export class TransactionModule {}
