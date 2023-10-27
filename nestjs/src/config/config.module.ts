import { DynamicModule, Global, Module } from '@nestjs/common'

@Global()
@Module({
  // providers: [
  //   {
  //     provide: 'Config',
  //     useValue: { url: 'http://www.baidu.com'}
  //   }
  // ],
  // exports: [
  //   {
  //     provide: 'Config',
  //     useValue: { url: 'http://www.baidu.com'}
  //   }
  // ]
})

export class ConfigModule {
  static forRoot(option: string): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config',
          useValue: { url: 'http://www.baidu.com', name: option}
        }
      ],
      exports: [
        {
          provide: 'Config',
          useValue: { url: 'http://www.baidu.com', name: option}
        }
      ]
    }
  }
}
