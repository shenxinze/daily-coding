import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable()
export class ResFormat<T = any> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map(data => {
      return {
        data,
        code: 0,
        success: true,
        message: '请求成功'
      }
    }))
  }
}