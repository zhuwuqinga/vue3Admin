# 公共组件

## 项目说明

项目架构为 vite2+vue3+ts

## API 书写规范

写清楚所有的 API 参数,参数说明,数据类型,可选值及默认值

例如:

| 参数    | 说明                      | 类型   | 可选值                                      | 默认值 |
| ------- | ------------------------- | ------ | ------------------------------------------------- | ------ |
| justify | flex布局下的水平排列方式 | string | start/end/center/space-around/space-between | start  |


## 打包部署注意要点

```ts
// 1、vite.config.ts 新增配置 base: './',
// 2、router/index 
//   base选项移除，修改为createWebHistory等方法的第一个参数传递
//   createWebHistory('/dist/')
// 3、nginx配置
// server {
//   listen       8088;
//   server_name  127.0.0.1;

//   location /dist {
//     root   E:\app-WEB\common-components;
//     index  index.html index.htm;
//     try_files $uri $uri/ /dist/index.html;
//   }
// }