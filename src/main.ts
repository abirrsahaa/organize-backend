/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from './auth/guard/apiKey-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // for security i am enabling cors and using helmet to secure the application 
  // how helmet works is it sets various HTTP headers to help protect the application from common vulnerabilities
  app.useGlobalGuards(new ApiKeyAuthGuard())
  app.enableCors();

  // look for the documentation of helmet for configuring it as for now i am passing it as default with nothing configured and disabling 
  app.use(helmet());



  // this is for swagger api Documentation 
  const config=new DocumentBuilder().setTitle('Organize Simple API')
  .setDescription('API for Organize Simple application')
  .setVersion('1.0')
  .addApiKey({
    type: 'apiKey',
    name: 'x-api-key',
    in: 'header',
    description: 'API Key for authentication for registered application',
  },'apiKey')
  .addTag('organize-simple')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  //  i am enabling versioning for the API's as nestjs supports it 
  app.enableVersioning({
  type: VersioningType.URI,
  });


  // listing all the pipes here
  app.useGlobalPipes(new ValidationPipe());



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
