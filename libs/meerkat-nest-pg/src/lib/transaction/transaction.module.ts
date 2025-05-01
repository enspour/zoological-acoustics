import { Module } from '@nestjs/common';
import { MkTransactionStorage } from './transaction';
import { MkTransactionService } from './transaction.service';

@Module({
  providers: [MkTransactionService, MkTransactionStorage],
  exports: [MkTransactionService, MkTransactionStorage],
})
export class MkTransactionModule {}
