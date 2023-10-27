import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction} from 'express'

@Injectable()
export class CounterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('进入中间件')
    next();
  }
}