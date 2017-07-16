# 前言

本项目是我博客后台管理系统的后台Nodejs项目，对应[vue-ourblog-manage](https://github.com/KloveML/vue-ourblog-manage.git)项目的后台接口

**备注：**
>I. 暂时只提供文章的crud接口，没有提供更多的接口，
>
>II. 之后慢慢会加入一些常用的功能，并且考虑会使用redis来做缓存处理等等


## 技术栈

nodejs + express + mongodb + mongoose + formidable + qiniu + es6/7

**备注：qiniu上传功能在项目中并没有用过，不过做过demo亲测可用**

## 项目运行
```bash

全局安装cross-env
npm i -g cross-env

git clone https://github.com/KloveML/node-ourblog.git

cd node-ourblog

npm install

npm run dev(需先开启mongodb)

访问  http://localhost:3333

```
