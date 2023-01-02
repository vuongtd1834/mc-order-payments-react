import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const configs = (
  configService: ConfigService
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [`${__dirname}/../../**/**/**.entity{.ts,.js}`],
  migrations: [`${__dirname}/../**/**.migration.ts`],
  migrationsRun: true,
  synchronize: true,
  logging: true,
  cli: {
    migrationsDir: 'src/migration'
  }
});
