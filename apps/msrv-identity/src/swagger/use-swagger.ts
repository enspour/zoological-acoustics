import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const useSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Identity')
    .setDescription('The identity API description')
    .setVersion('1.0')
    .addTag('identity')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, documentFactory);
};
