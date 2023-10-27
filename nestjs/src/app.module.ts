import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CounterMiddleware } from './counter/counter.middleware'
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { ConfigModule } from './config/config.module';
import { StudentModule } from './student/student.module';
import { SchoolModule } from './school/school.module';
import { UploadModule } from './upload/upload.module';
import { SpiderModule } from './spider/spider.module';
import { GuardModule } from './guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: "mysql", // 数据库类型
      username: "root", // 账号
      password: "root", // 密码
      host: "localhost", // host
      port: 3306, //
      database: "test", // 库名
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize: true, // synchronize 字段代表是否自动将实体类同步到数据库
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 重试连接数据库的次数
      autoLoadEntities: true, // 如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    ConfigModule.forRoot('百度一下'),
    StudentModule,
    SchoolModule,
    UploadModule,
    SpiderModule,
    GuardModule,
    TestModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    // AppService,
    {
      provide: 'TEST',
      useClass: AppService
    },
    {
      provide: 'TEST1',
      useValue: ['淘宝', '拼多多', '京东']
    },
    {
      provide: 'ABC',
      useFactory() {
        return 123
      }
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CounterMiddleware).forRoutes('user')
    // consumer.apply(CounterMiddleware).forRoutes({
    //   path: 'user',
    //   method: RequestMethod.GET
    // })
  } 
}
