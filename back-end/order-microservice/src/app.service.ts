import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  init(): string {
    return 'The orders microservice!';
  }
}
