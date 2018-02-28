package com.southeast.conf

import org.apache.spark._
import org.apache.spark.sql._
import java.util.Properties

import com.southeast.utils.LoggerLevels

trait AppConf {
  //去除提示信息
  LoggerLevels.setStreamingLogLevels()

  val conf=new SparkConf().setAppName("ETLDemo").setMaster("local")
  val sc=new SparkContext(conf)

  val sqlContext = new SQLContext(sc)

  //jdbc连接
  val jdbcURL = "jdbc:mysql://localhost:3306/movie"
  val recResultTable = "movie.user_movie_recommandation"
  val mysqlusername = "root"
  val mysqlpassword = "root"
  val prop = new Properties
  prop.put("driver", "com.mysql.jdbc.Driver")
  prop.put("user", mysqlusername)
  prop.put("password", mysqlpassword)
}