import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Default endpoint' })
  @ApiResponse({
    status: 200,
    description: 'The orders microservice!'
  })
  init(): string {
    return this.appService.init();
  }
}
