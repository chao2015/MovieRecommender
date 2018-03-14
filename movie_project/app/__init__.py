# -*- coding:utf-8 -*-
__author__ = 'yeyilu'
__date__ = '2017/8/27 14:41'

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
# from flask.ext.redis import FlaskRedis
from flask_redis import FlaskRedis
import pymysql
import os

# 连接数据库,打开数据库movie
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:5220638@127.0.0.1:3306/movie3"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config["SECRET_KEY"] = 'f3fbd1d3d9e7426c94f1a344c91dcee9'
app.config["REDIS_URL"] = "redis://127.0.0.1:6379/0"
app.config["UP_DIR"] = os.path.join(os.path.abspath(os.path.dirname(__file__)), "static/uploads/")
app.config["FC_DIR"] = os.path.join(os.path.abspath(os.path.dirname(__file__)), "static/uploads/users/")
app.debug = True
db = SQLAlchemy(app)
rd = FlaskRedis(app)

from app.home import home as home_blueprint
from app.admin import admin as admin_blueprint

app.register_blueprint(home_blueprint)
app.register_blueprint(admin_blueprint, url_prefix="/admin")


# 404页面
@app.errorhandler(404)
def page_not_found(error):
    return render_template("home/404.html"), 404
