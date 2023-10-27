import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import { VersioningType, Logger, ValidationPipe } from '@nestjs/common';
import * as cors from 'cors'

import { NestExpressApplication } from '@nestjs/platform-express'

import { Request, Response, NextFunction} from 'express'
import { join } from 'path';

import { ResFormat } from './common/resFormat';
import { ErrorFilter } from './common/errorFilter'

// import { RoleGuard } from './guard/role/role.guard'

const MiddlerWareAll = (req: Request, res: Response, nest: NextFunction) => {
  // console.log('进入全局中间件')
  nest()
}

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'


const PORT = 5555
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/img'
  })
  app.enableVersioning({
    type: VersioningType.URI
  })
  app.use(session({secret: 'test-session', rolling: true, name: 'test.sid', cookie: {maxAge: 999999}}))
  app.use(cors())
  app.use(MiddlerWareAll)
  app.useGlobalInterceptors(new ResFormat())
  app.useGlobalFilters(new ErrorFilter())
  app.useGlobalPipes(new ValidationPipe())
  const options = new DocumentBuilder().addBearerAuth().setTitle('swagger文档').setDescription('在线测试文档').setVersion('1').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api-docs', app, document)
  // app.useGlobalGuards(new RoleGuard())
  await app.listen(PORT, () => {
    Logger.log(`服务器已经启动：http://localhost:${PORT}`)
  });
}
bootstrap();
