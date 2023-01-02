import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      retryAttempts: 5,
      retryDelay: 1000,
      url: `redis://${process.env.REDIS_HOST || 'localhost'}:${
        process.env.REDIS_PORT || 6379
      }`,
    },
  });

  await app.listen();
}
bootstrap();
