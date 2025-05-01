import { MkBusinessError } from './business.error';

export class MkUnauthorizedError extends MkBusinessError {
  constructor(message = '') {
    super(message, 401);
  }
}
