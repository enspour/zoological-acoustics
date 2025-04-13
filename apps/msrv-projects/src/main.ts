import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { BusinessErrorFilter } from '@kudu/msrv-util-error-handling';
import { EventBusModule } from '@kudu/msrv-util-event-bus';

import { useSwagger } from './swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api/v1/projects';
  app.setGlobalPrefix(globalPrefix);

  useSwagger(app);

  app.use(cookieParser());
  app.useGlobalFilters(new BusinessErrorFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  EventBusModule.connect(app, { queue: 'projects', group: 'msrv-projects' });
  EventBusModule.connect(app, { queue: 'users', group: 'msrv-projects' });
  EventBusModule.connect(app, { queue: 'employees', group: 'msrv-projects' });

  app.startAllMicroservices();

  const port = process.env.PORT || 3002;

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
