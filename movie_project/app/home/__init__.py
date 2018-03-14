# -*- coding:utf-8 -*-
__author__ = 'yeyilu'
__date__ = '2017/8/27 14:44'

from flask import Blueprint

home = Blueprint("home", __name__)

import app.home.views
