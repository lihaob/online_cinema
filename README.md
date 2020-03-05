```
基于nodejs和express框架的在线播放网站服务端

环境
nodejs，express

安装
1.在项目路径下执行npm install 
2.mysql数据库新建db，导入online_cinema.sql文件，然后修改项目的configuration.js中
的数据库配置
3.可以在bin/www中修改服务器端口


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


