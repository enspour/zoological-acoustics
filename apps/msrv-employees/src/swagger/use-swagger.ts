import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const useSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Employees')
    .setDescription('The employees API description')
    .setVersion('1.0')
    .addTag('employees')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, documentFactory);
};
