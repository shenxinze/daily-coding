import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { SchoolService } from 'src/school/school.service';
import * as uuid from 'uuid';
import { ApiBearerAuth, ApiQuery, ApiParam, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'

console.log(uuid.v4())

// import { StudentPipe } from './student.pipe'

@Controller('student')
@ApiBearerAuth()
@ApiTags('学生管理')
export class StudentController {
  constructor(
    @Inject('Config') private readonly urlObj: {url: string},
    private readonly studentService: StudentService,
    private readonly schoolService: SchoolService
  ) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({summary: '查询所有接口', description: '描述内容xxx'})
  @ApiQuery({name: 'page', description: '分页信息'})
  @ApiResponse({status: 403, description: '403描述信息xxx'})
  findAll() {
    // return this.studentService.findAll();
    // return this.schoolService.findAll();
    console.log(this.urlObj)
    return this.urlObj
  }

  @Get(':id')
  @ApiParam({name: 'id', description: '这是一个学生id', required: true, type: Number})
  findOne(@Param('id', ParseUUIDPipe) id: number) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
