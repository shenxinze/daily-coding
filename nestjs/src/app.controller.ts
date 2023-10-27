import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('TEST') private readonly appService: AppService,
    @Inject('TEST1') private readonly test: string[],
    @Inject('ABC') private readonly abc: number
  ) {}

  @Get()
  getHello(): number {
    // return this.appService.getHello();
    return this.abc
  }

  @Get('corstest')
  corsTest() {
    return {
      msg: '测试跨域'
    }
  }
}
