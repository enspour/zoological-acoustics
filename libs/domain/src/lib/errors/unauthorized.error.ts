import { BusinessError } from './business.error';

export class UnauthorizedError extends BusinessError {
  constructor(message = '') {
    super(message, 401);
  }
}
