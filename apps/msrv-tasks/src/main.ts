import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { BusinessErrorFilter } from '@kudu/msrv-util-error-handling';

import { useSwagger } from './swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api/v1/tasks';
  app.setGlobalPrefix(globalPrefix);

  useSwagger(app);

  app.use(cookieParser());
  app.useGlobalFilters(new BusinessErrorFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.startAllMicroservices();

  const port = process.env.PORT || 3003;

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
