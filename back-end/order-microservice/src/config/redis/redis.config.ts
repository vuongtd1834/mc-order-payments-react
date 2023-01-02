import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const redisConfig = async (configService: ConfigService) => {
  return ClientProxyFactory.create({
    transport: Transport.REDIS,
    options: {
      url: `redis://${configService.get<string>(
        'REDIS_HOST'
      )}:${configService.get<string>('REDIS_PORT')}`
    }
  });
};
