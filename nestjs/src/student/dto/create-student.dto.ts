import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateStudentDto {
  // @IsNotEmpty() // 验证是否为空
  // @IsString() // 是否为字符串
  // @Length(5, 10, {
  //   message: '最少5个，最多10个'
  // })
  // name: string

  // @IsNotEmpty({
  //   message: 'age 不能为空'
  // })
  // @IsNumber({}, {
  //   message: 'age 必须为数字'
  // })
  // age: number
  @ApiProperty({example: '小明' })
  name: string
  @ApiProperty({example: 18})
  age: number
}
