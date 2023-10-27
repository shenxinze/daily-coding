import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, StreamableFile } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { join } from 'path';
import { zip } from 'compressing'
import { createReadStream } from 'fs';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @UseInterceptors(FileInterceptor('file')) // 处理文件
  upload(@UploadedFile() file) {
    console.log('file', file)
    return '上传成功！'
  }

  @Get('export')
  downLoad(@Res() res: Response) {
    const url = join(__dirname, '../images/1677134694169.png')
    res.download(url)
  }

  @Get('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, '../images/1677134694169.png')
    const tarStream = new zip.Stream()
    await tarStream.addEntry(url)
    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=test'
    )
    tarStream.pipe(res)
  }

  @Get('test')
  downImg(): StreamableFile {
    const file = createReadStream(join(__dirname, '../images/1677134694169.png'))
    return new StreamableFile(file)
  }
}
