import { MkBusinessError } from './business.error';

export class MkNotFoundError extends MkBusinessError {
  constructor(message: string) {
    super(message, 404);
  }
}
