import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.use('/audio', express.static(join(process.cwd(), '/uploads/')));
  await app.listen(3000);
}
bootstrap();
