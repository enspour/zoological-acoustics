import { MkBusinessError } from './business.error';

export class MkBadRequestError extends MkBusinessError {
  constructor(message: string) {
    super(message, 400);
  }
}
