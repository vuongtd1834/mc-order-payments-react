import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  });
  const options = new DocumentBuilder()
    .setTitle('Order RESTFul API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      retryAttempts: 5,
      retryDelay: 1000
    }
  });

  await app.listen(4000);
}
bootstrap();
