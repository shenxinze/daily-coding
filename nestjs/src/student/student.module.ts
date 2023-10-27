import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SchoolService } from 'src/school/school.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, SchoolService]
})
export class StudentModule {}
