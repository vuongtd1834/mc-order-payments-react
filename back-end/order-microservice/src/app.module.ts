import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configs } from './config/orm/orm.config';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: configs,
      inject: [ConfigService]
    }),
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
