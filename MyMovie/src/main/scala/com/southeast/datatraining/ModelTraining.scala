package com.southeast.datatraining

import com.southeast.caseclass.{Links, Movies, Ratings, Tags}
import com.southeast.conf.AppConf
import org.apache.spark.mllib.recommendation.{ALS,Rating}



/**
  * Created by Hero on 2018/2/28.
  */
object ModelTraining  extends AppConf{
  private def rebuild1(input:String):String = {
    val a = input.split(",")
    val head = a.take(1).mkString(",")//取数组前两个元素，并用，连接
    val tail = a.takeRight(1).mkString
    val b = a.drop(1).dropRight(1).mkString.replace("\"", "")//删除前面两个元素，和最后一个元素，就得到电影名了
    val output = head + "," + b + "," + tail
    output
  }

  private def rebuild2(input:String):String = {
    val a = input.split(",")
    val head = a.take(2).mkString(",")//取数组前两个元素，并用，连接
    val tail = a.takeRight(1).mkString
    val b = a.drop(2).dropRight(1).mkString.replace("\"", "")//删除前面两个元素，和最后一个元素，就得到电影名了
    val output = head + "," + b + "," + tail
    output
  }

  def main(args: Array[String]){
      //一。数据预处理

      //RDD的Partition数量一般为CPU核数的整数倍
      val minPartitions = 8

      val linksRDD = sc.textFile("data/links.txt", minPartitions).filter(! _.endsWith(",")).map(line => {// _ 表示每一行元素
        val fields = line.split(",")
        Links(fields(0).trim().toInt, fields(1).trim().toInt, fields(1).trim().toInt)
      })

      val moviesRDD = sc.textFile("data/movies.txt", minPartitions).filter(!_.endsWith(",")).map(x => rebuild1(x)).map(line => {
        val fields = line.split(",")
        Movies(fields(0).trim().toInt, fields(1), fields(2))
      })

      val ratingsRDD = sc.textFile("data/ratings.txt", minPartitions).filter(!_.endsWith(",")).map(line => {
        val fields = line.split(",")
        Ratings(fields(0).trim().toInt, fields(1).trim().toInt, fields(2).trim().toDouble, fields(3).trim().toLong)
      })

      val tagsRDD = sc.textFile("data/tags.txt", minPartitions).filter(!_.endsWith(",")).map(x => rebuild2(x)).map(line => {
        val fields = line.split(",")
        Tags(fields(0).trim().toInt, fields(1).trim().toInt, fields(2).trim(), fields(3).trim().toLong)
        //4852,49130,life reflection,1422984831
      })

      //3.将RDD转换成DataFrameRDD
      import sqlContext.implicits._
      val linksDF = linksRDD.toDF
      val moviesDF = moviesRDD.toDF
      val ratingsDF = ratingsRDD.toDF
      val tagsDF = tagsRDD.toDF


      //4.在hive中临时创建几个表，方便下面几个临时表的创建
      linksDF.registerTempTable("links")// ""中是表的名称
      moviesDF.registerTempTable("movies")
      ratingsDF.registerTempTable("ratings")
      tagsDF.registerTempTable("tags")

    //二、数据处理 ==> 得到训练集

    /*  val prop=new java.util.Properties
      prop.setProperty("user","root")
      prop.setProperty("password","root")*/

      val count = sqlContext.sql("select count(*) from ratings").first().getLong(0).toInt
      val percent = 0.6
      val trainingdatacount = (count * percent).toInt
      val testdatacount = (count * (1 - percent)).toInt

      val trainingDataAscTable = sqlContext.sql(s"select userId,movieId,rating from ratings order by timestamp asc").registerTempTable("trainingDataAsc")
      //.write.mode(SaveMode.Append).jdbc("jdbc:mysql://localhost:3306/movie","trainingDataAsc",prop) // 表可以不存在

      val trainingDataTable = sqlContext.sql(s"select * from trainingDataAsc limit $trainingdatacount").registerTempTable("trainingData")
      //.write.mode(SaveMode.Append).jdbc("jdbc:mysql://localhost:3306/movie","trainingData",prop)

      val testDataTable = sqlContext.sql(s"select * from trainingDataAsc limit $testdatacount").registerTempTable("testData")
      //.write.mode(SaveMode.Append).jdbc("jdbc:mysql://localhost:3306/movie","testData",prop)


    //三、训练模型
    val trainingData = sqlContext.sql("select * from trainingData")
    val testData = sqlContext.sql("select * from testData")

    //1.1获取训练数据
    val ratingRDD = trainingData.rdd.map(x => Rating(x.getInt(0), x.getInt(1), x.getDouble(2)))
    //1.2对推荐模型进行评分
    val training2 = ratingRDD.map {
      case Rating(userid, movieid, rating) => (userid, movieid)
    }

    //2.1获取测试数据
    val testRDD = testData.rdd.map(x => Rating(x.getInt(0), x.getInt(1), x.getDouble(2)))
    val test2 = testRDD.map { case Rating(userid, movieid, rating) => ((userid, movieid), rating) }


    val model = ALS.train(ratingRDD, 1, 5, 0.01)

    val users = sqlContext.sql("select distinct(userId) from trainingData order by userId asc")
    val index = 139
    val uid = users.take(index).last.getInt(0)

    val rec = model.recommendProducts(uid, 5)
    val recmoviesid = rec.map(_.product)
    println("我为用户" + uid + "推荐了以下5部电影：")
    for (i <- recmoviesid) {
      val moviename = sqlContext.sql(s"select title from movies where movieId=$i").first().getString(0)
      println(moviename)
    }

    //===================================================
    //特征向量的个数
   /* val rank = 1
    //正则因子
    val lambda = List(0.001, 0.005, 0.01, 0.015, 0.02, 0.1)
    //迭代次数
    val iteration = List(10, 20, 30, 40)
    var bestRMSE = Double.MaxValue
    var bestIteration = 0
    var bestLambda = 0.0

    for (lam <- lambda; i <- iteration) {
      //训练模型
      val model = ALS.train(ratingRDD, rank, i, lam)

      //获取结果
      val predict = model.predict(training2).map {
        case Rating(userid, movieid, rating) => ((userid, movieid), rating)
      }

      //将结果与实际比对
      val predictAndFact = predict.join(test2)
      val MSE = predictAndFact.map {
        case ((user, product), (r1, r2)) =>
          val err = r1 - r2
          err * err
      }.mean()
      val RMSE = math.sqrt(MSE)
      //RMSE越小，代表模型越精确
      if (RMSE < bestRMSE) {
        model.save(sc, s"E:/movie/BestModel/$RMSE")
        bestRMSE = RMSE
        bestIteration = i
        bestLambda = lam
      }
      println(s"Best model is located in E:/movie/BestModel/$RMSE")
      println(s"Best RMSE is $bestRMSE")
      println(s"Best Iteration is $bestIteration")
      println(s"Best Lambda is $bestLambda")
    }*/
    //===================================================
  }
}
