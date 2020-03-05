```
基于nodejs和express框架的在线播放网站服务端

安装
mysql数据库在某个db中导入sql文件，然后修改项目的configuration.js中
的数据库配置

项目结构
com.cinema_online
├─ app.js
├─ bin//包装app.js
│    └─ www
├─ configurations.js//配置
├─ const.js//常量
├─ controllers//业务逻辑层
│    └─ userController.js
├─ modules//module层
│    ├─ base.js
│    └─ users.js
├─ node_modules
├─ online_cinema.sql//sql文件
├─ package-lock.json
├─ package.json//依赖配置
├─ public
│    └─ stylesheets
│           └─ style.css
├─ routes//路由
│    ├─ index.js
│    └─ users.js
├─ test//测试
│    └─ users
│           └─ getUserByName.js
└─ views
       ├─ error.ejs
       └─ index.ejs
```


