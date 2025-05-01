import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

import { MkBusinessError } from './errors/business.error';

@Catch(MkBusinessError)
export class MkBusinessErrorFilter implements ExceptionFilter {
  catch(exception: MkBusinessError, host: ArgumentsHost) {
    const type = host.getType();

    if (type === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

      return response
        .status(exception.status)
        .json({ statusCode: exception.status, message: exception.message });
    }

    return;
  }
}
