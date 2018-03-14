# movie_project
Python Web框架Flask实现微电影网站系统

本项目是基于Flask框架，Python3.6开发的，运行环境:python3.x以上 
1. 先安装mysql
   安装的时候需要密码设置为yeyilu

2. 通过navicat 新建数据库 库名为movie 注意数据库的字符集统一设置为utf8

3. navicat 导入movie.sql文件

4. pip install -r requirements.txt 安装依赖包


5. 安装redis数据库,并开启redis (Flask结合redis消息队列实现弹幕功能)


6. python manage.py


7. 浏览器中输入 127.0.0.1:5000访问

注:nginx.conf文件是在Linux服务器上运行使用，本机环境运行不需要nginx配置文件
