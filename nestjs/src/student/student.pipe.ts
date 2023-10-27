import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class StudentPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value)
    console.log('metadata', metadata)
    const DTO = plainToInstance(metadata.metatype, value)
    console.log(DTO) // CreateStudentDto { name: 'shenxinze', age: 18 }
    const errors = await validate(DTO) // 返回失败的信息
    console.log(errors)
    if (errors.length) {
      console.log(123)
      throw new HttpException(errors, HttpStatus.BAD_REQUEST)
    }
    return value;
  }
}
