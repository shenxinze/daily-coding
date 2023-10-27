# express

> 项目采用 `Express` 应用程序生成器，快速搭建项目应用骨架

## 安装依赖

```
yarn add
```

## 运行项目

```
yarn start
```

## 目录结构说明

```
config/db.config.js       连接数据库配置
model                     数据模型
```

## 开启数据库服务

> 找到 `MongoDB` 安装目录，进入bin目录，打开cmd输入命令开启数据库服务

```
mongod.exe -dbpath=XXX\daily-coding\express\db
```