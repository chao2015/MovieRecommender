/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : movie

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-12-20 12:21:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `pwd` varchar(100) DEFAULT NULL,
  `is_super` smallint(6) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `role_id` (`role_id`),
  KEY `ix_admin_addtime` (`addtime`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'yeyilumovie', 'pbkdf2:sha256:50000$11EzQXdO$793a993306e51abd9cac4219cfc11ff62cbf7de5416ca45e9b572219ebd77835', '0', '1', '2017-08-30 13:01:29');
INSERT INTO `admin` VALUES ('2', 'def123', 'pbkdf2:sha256:50000$a06TOSXs$3c9c12afca1d083737f6d647bb02cc847e2c6efd3d662a200220267306f8d6f9', '1', '2', '2017-09-07 21:38:07');

-- ----------------------------
-- Table structure for `adminlog`
-- ----------------------------
DROP TABLE IF EXISTS `adminlog`;
CREATE TABLE `adminlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  KEY `ix_adminlog_addtime` (`addtime`),
  CONSTRAINT `adminlog_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of adminlog
-- ----------------------------
INSERT INTO `adminlog` VALUES ('1', '1', '127.0.0.1', '2017-09-06 19:28:23');
INSERT INTO `adminlog` VALUES ('2', '1', '127.0.0.1', '2017-09-06 19:29:28');
INSERT INTO `adminlog` VALUES ('3', '1', '127.0.0.1', '2017-09-07 10:59:55');
INSERT INTO `adminlog` VALUES ('4', '1', '127.0.0.1', '2017-09-07 12:42:37');
INSERT INTO `adminlog` VALUES ('5', '1', '127.0.0.1', '2017-09-07 15:15:45');
INSERT INTO `adminlog` VALUES ('6', '1', '127.0.0.1', '2017-09-07 20:04:06');
INSERT INTO `adminlog` VALUES ('7', '1', '127.0.0.1', '2017-09-08 20:34:15');
INSERT INTO `adminlog` VALUES ('8', '1', '127.0.0.1', '2017-09-09 10:46:40');
INSERT INTO `adminlog` VALUES ('9', '1', '127.0.0.1', '2017-09-09 19:47:18');
INSERT INTO `adminlog` VALUES ('10', '1', '127.0.0.1', '2017-09-10 16:30:34');
INSERT INTO `adminlog` VALUES ('11', '1', '127.0.0.1', '2017-09-10 21:45:22');
INSERT INTO `adminlog` VALUES ('12', '1', '127.0.0.1', '2017-09-11 09:27:15');
INSERT INTO `adminlog` VALUES ('13', '1', '127.0.0.1', '2017-09-11 10:01:47');
INSERT INTO `adminlog` VALUES ('14', '1', '127.0.0.1', '2017-09-11 15:44:04');
INSERT INTO `adminlog` VALUES ('15', '1', '127.0.0.1', '2017-09-11 18:47:23');
INSERT INTO `adminlog` VALUES ('16', '1', '127.0.0.1', '2017-09-12 10:01:01');
INSERT INTO `adminlog` VALUES ('17', '1', '127.0.0.1', '2017-09-13 13:43:01');
INSERT INTO `adminlog` VALUES ('18', '1', '127.0.0.1', '2017-09-15 10:13:42');
INSERT INTO `adminlog` VALUES ('19', '1', '127.0.0.1', '2017-09-15 11:16:31');
INSERT INTO `adminlog` VALUES ('20', '1', '127.0.0.1', '2017-09-24 14:58:42');
INSERT INTO `adminlog` VALUES ('21', '1', '127.0.0.1', '2017-09-26 21:37:19');
INSERT INTO `adminlog` VALUES ('22', '1', '127.0.0.1', '2017-12-19 22:12:37');

-- ----------------------------
-- Table structure for `auth`
-- ----------------------------
DROP TABLE IF EXISTS `auth`;
CREATE TABLE `auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `url` (`url`),
  KEY `ix_auth_addtime` (`addtime`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth
-- ----------------------------
INSERT INTO `auth` VALUES ('1', '添加标签', '/admin/tag/add/', '2017-09-07 15:16:39');
INSERT INTO `auth` VALUES ('2', '编辑标签', '/tag/edit/<int:id>/', '2017-09-07 15:18:04');
INSERT INTO `auth` VALUES ('3', '标签列表', '/tag/list/<int:page>/', '2017-09-07 15:18:33');
INSERT INTO `auth` VALUES ('4', '删除标签', '/tag/del/<int:id>/', '2017-09-07 15:19:03');

-- ----------------------------
-- Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `movie_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movie_id` (`movie_id`),
  KEY `user_id` (`user_id`),
  KEY `ix_comment_addtime` (`addtime`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('10', '难看', '7', '2', '2017-09-06 15:48:39');
INSERT INTO `comment` VALUES ('11', '无聊', '7', '3', '2017-09-06 15:48:39');
INSERT INTO `comment` VALUES ('12', '乏味', '7', '4', '2017-09-06 15:48:39');
INSERT INTO `comment` VALUES ('13', '非常棒！', '8', '5', '2017-09-06 15:48:39');
INSERT INTO `comment` VALUES ('14', '经典', '8', '6', '2017-09-06 15:48:39');
INSERT INTO `comment` VALUES ('15', '给力', '8', '7', '2017-09-06 15:48:39');
INSERT INTO `comment` VALUES ('16', '不错', '8', '8', '2017-09-06 15:48:39');
INSERT INTO `comment` VALUES ('17', '<p><img src=\"http://img.baidu.com/hi/jx2/j_0002.gif\"/></p>', '7', '13', '2017-09-10 14:56:17');
INSERT INTO `comment` VALUES ('18', '<p><img src=\"http://img.baidu.com/hi/jx2/j_0002.gif\"/></p>', '8', '13', '2017-09-10 16:35:19');
INSERT INTO `comment` VALUES ('19', '<p><img src=\"http://img.baidu.com/hi/jx2/j_0002.gif\"/></p>', '12', '13', '2017-09-10 22:32:20');
INSERT INTO `comment` VALUES ('20', '<p>很好看！！！</p>', '12', '13', '2017-09-10 22:33:08');
INSERT INTO `comment` VALUES ('22', '<p><img src=\"http://img.baidu.com/hi/jx2/j_0063.gif\"/></p>', '10', '13', '2017-09-11 15:48:40');
INSERT INTO `comment` VALUES ('24', '<p><img src=\"http://img.baidu.com/hi/face/i_f08.gif\"/>感觉一般般吧~<br/></p>', '13', '14', '2017-09-15 10:22:39');
INSERT INTO `comment` VALUES ('25', '<p><img src=\"http://img.baidu.com/hi/jx2/j_0015.gif\"/></p>', '7', '14', '2017-09-15 10:28:30');
INSERT INTO `comment` VALUES ('26', '<p><img src=\"http://img.baidu.com/hi/jx2/j_0003.gif\"/></p>', '14', '15', '2017-09-15 11:21:46');
INSERT INTO `comment` VALUES ('27', '<p><img src=\"http://img.baidu.com/hi/jx2/j_0002.gif\"/> 很好看</p>', '16', '13', '2017-09-26 21:43:08');
INSERT INTO `comment` VALUES ('28', '<p><img src=\"http://img.baidu.com/hi/jx2/j_0002.gif\"/><img src=\"http://img.baidu.com/hi/jx2/j_0003.gif\"/></p>', '9', '16', '2017-09-26 21:46:06');

-- ----------------------------
-- Table structure for `movie`
-- ----------------------------
DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `info` text,
  `logo` varchar(255) DEFAULT NULL,
  `star` smallint(6) DEFAULT NULL,
  `playnum` bigint(20) DEFAULT NULL,
  `commentnum` bigint(20) DEFAULT NULL,
  `tag_id` int(11) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `release_time` date DEFAULT NULL,
  `length` varchar(100) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  UNIQUE KEY `url` (`url`),
  UNIQUE KEY `logo` (`logo`),
  KEY `tag_id` (`tag_id`),
  KEY `ix_movie_addtime` (`addtime`),
  CONSTRAINT `movie_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of movie
-- ----------------------------
INSERT INTO `movie` VALUES ('7', '三生三世十里桃花', '201709061544125ea0c1f5dfc04641bf16328654aa416b.mp4', '影版三生三世十里桃花   天族战神墨渊镇压鬼君擎苍（严屹宽饰）于无妄海，魂飞魄散，仙体冰封于青丘炎华洞内。青丘帝姬白浅（刘亦菲饰）同天族太子夜华（杨洋饰）早有婚约，二人却一直未曾相见。直至东海盛宴，夜华发现白浅竟然同亡妻素素相貌一样，就势住进白浅的青丘，放下太子身段，为求解开白浅与素素之谜。夜华侧妃素锦（李纯饰）生妒，暗中协助鬼族王后玄女（顾璇饰）抢走墨渊仙体。白浅一怒之下血战鬼族大紫明宫，身负重伤，终被夜华救下。', '20170906154412a136b4fc2f8448f98ac23ae8d935937b.jpg', '3', '64', '2', '11', '中国大陆', '2017-08-04', '123', '2017-09-06 15:44:13');
INSERT INTO `movie` VALUES ('8', '大话西游', '201709061547496a9b39056a6546f89e399a411f57838c.mp4', '周星驰版孙悟空 该片主要讲述了至尊宝为了救白晶晶而穿越回到五百年前，遇见紫霞仙子之后发生一段感情并最终成长为孙悟空的故事。', '2017090615474930083137b78048e6a417d5fed9abe2f6.png', '5', '35', '1', '11', '中国香港', '2017-04-14', '112', '2017-09-06 15:47:49');
INSERT INTO `movie` VALUES ('9', '战狼Ⅱ', '201709102148418336d3d994754707be680665eee9b74d.mp4', '被开除军籍的冷锋（吴京饰演）本是因找寻龙小云（余男饰演）来到非洲，但是却突然被卷入一场非洲国家的叛乱。作为退伍老兵的冷锋无法忘记曾经为军人的使命，随着斗争的持续，体内的狼性逐渐复苏，最终闯入战乱区域，为同胞而战斗。', '2017091021484158e8f2304a7b4eecaa6286cb76a4e624.jpg', '5', '30', '1', '16', '中国大陆', '2017-07-28', '123', '2017-09-10 21:48:42');
INSERT INTO `movie` VALUES ('10', '春娇救志明', '201709102158144c3a81c2650e4fcaa4fc645a320df951.mp4', '在余春娇（杨千嬅饰）与张志明（余文乐饰）复合后的第五年，两人的生活趋于安稳平静，但志明好像继续长不大，喜欢结识女性朋友，也可能是所有女孩子都主动追求志明，他想避都避不开。春娇要发挥女人本色，誓要用尽所有力气捍卫这段八年情。', '201709102158147cd6288e54f34aad837e43dfd02b3089.jpg', '5', '12', '2', '11', '中国香港', '2017-04-28', '120', '2017-09-10 21:58:14');
INSERT INTO `movie` VALUES ('11', '你的名字。', '20170910221049d2b333071526418caf8631df2c6b94cf.mp4', '故事发生的地点是在每千年回归一次的彗星造访过一个月之前，日本飞驒市的乡下小镇糸守町。在这里女高中生三叶每天都过着忧郁的生活，而她烦恼的不光有担任镇长的父亲所举行的选举运动，还有家传神社的古老习俗。在这个小小的城镇，周围都只是些爱瞎操心的老人。为此三叶对于大都市充满了憧憬。然而某一天，自己做了一个变成男孩子的梦。这里有着陌生的房间、陌生的朋友。而眼前出现的则是东京的街道。三叶虽然感到困惑，但是能够来到朝思暮想的都市生活，让她觉得神清气爽。另一方面在东京生活的男高中生立花泷也做了个奇怪的梦，他在一个从未去过的深山小镇中，变成了女高中生。两人就这样在梦中邂逅了彼此。', '201709102205517c769da7ea8c4b1ba1554be24041585c.jpg', '5', '28', '0', '11', '日本', '2016-12-02', '107', '2017-09-10 22:05:52');
INSERT INTO `movie` VALUES ('12', '尸忆', '201709102218474c2ccdde607c4d328972c98f4c6a9bb4.mp4', '《尸忆》是由谢庭菡执导的恐怖片，由一濑隆重监制，吴慷仁、谢欣颖、严正岚、田中千绘等领衔出演 。该片讲述了担任灵异节目的电视制作人承皓在公园捡到一个红包后，开始碰到许多灵异现象的故事。该片于2015年8月20日在中国台湾上映。', '20170910221847fa4a3a4200574cc6bfd6fe8d171ea192.png', '4', '35', '2', '14', '中国台湾', '2015-08-20', '89', '2017-09-10 22:18:47');
INSERT INTO `movie` VALUES ('13', '新木乃伊', '201709151015368e3704810ca44d9db9ab748c5430b9a0.mp4', '一名叫尼克·摩顿（汤姆·克鲁斯饰）的海豹突击队成员，在执行任务期间，意外地带着自己的小队闯入一个地下古墓，队员经过重重磨难全部丧生，只剩下尼克·摩顿一个人。木乃伊公主安玛奈特（索菲亚·宝特拉饰），遗恨千年后重返人间，誓要在新世界再建属于她的埃及王朝。后来尼克与珍妮·哈尔西（安娜贝拉·沃丽丝饰）及一班军人坐上运送棺木的飞机。飞机突然被一大群鸟袭击失事，千钧一发之际尼克·摩顿为珍妮戴上降落伞，英雄救美最后牺牲了自己。', '201709151015360b02b3ff027c4d37817b836e55e0ff2c.jpg', '3', '13', '2', '10', '美国', '2017-06-09', '110', '2017-09-15 10:15:36');
INSERT INTO `movie` VALUES ('14', '蝙蝠侠大战超人：正义黎明', '201709151118396b1d45999f3d451d95069f5b2ae46df2.mp4', '该片故事背景设定在《超人：钢铁之躯》结尾大战后，围绕着蝙蝠侠和超人之间激增的矛盾而展开，讲述了超人帮助人类解决了很多问题，成为了人类的神，却引起了莱克斯·卢瑟的嫉妒，从而挑拨蝙蝠侠与超人之间战斗的故事。', '2017091511183990a536730ef7401da2d8faf786013d52.jpg', '4', '8', '1', '17', '美国', '2016-03-25', '151', '2017-09-15 11:18:40');
INSERT INTO `movie` VALUES ('15', '陈翔六点半', '20170924150202921b75aa404a47dea152723c4fd6b697.mp4', '《陈翔六点半》有灵活的场景和固定的时长，家庭幽默录像式的小情节短剧，无固定演员固定角色具有鲜明的网络特点，每集均有至少一个笑点，时长一到三分钟，由一到两个情节组成，其目的就是让观众用最短的时间和通过最方便的移动互联网平台，解压，放松，快乐。', '201709241502029babb66ea53141bbbeef1ec93c6522fa.jpg', '5', '14', '0', '15', '中国大陆', '2016-12-25', '4', '2017-09-24 15:02:02');
INSERT INTO `movie` VALUES ('16', '千与千寻', '20170926213917b5f3153f88b740acb2deec9854b1a6ca.mp4', '《千与千寻》是宫崎骏执导、编剧，吉卜力工作室制作的动画电影，影片于2001年7月20日在日本正式上映，讲述了少女千寻意外来到神灵异世界后发生的故事。该片荣获2003年奥斯卡金像奖最佳长篇动画，同时也是历史上唯一一部以动画电影身份获得欧洲三大电影节之一的德国柏林电影节最高奖项金熊奖的动画作品。', '20170926213917f61b2420eeb24e04a8fd7ac4b43ce8a8.jpg', '5', '12', '1', '10', '日本', '2001-07-20', '125', '2017-09-26 21:39:17');
INSERT INTO `movie` VALUES ('17', '降魔的', '20171219222043610425fb17f74e06ac1deb9c96d53e0f.mp4', '《降魔的》是香港电视广播有限公司拍摄制作的时装惊悚、鬼魂、喜剧电视剧，由马国明、黄智雯、胡鸿钧、刘佩玥领衔主演，并由黄子恒、蒋志光、谢雪心、阮小仪及金刚联合主演，监制方骏钊。\r\n降魔的意指会降魔出租车，此剧描写一名有阴阳眼的出租车司机会接载“其他空间”的生物，探索各种都市传说与灵异空间，会有恐怖场面，还会有不同的感人故事。值得一提，《降魔的》是TVB首部经“重重有赏”计划而衍生出的电视剧，该计划是由无线的员工自发性提供原创故事桥段，并获接纳及开拍成剧集。\r\n此剧为2017无线节目巡礼14部剧集之一，亦是无线电视50周年4部台庆剧之一。', '201712192220430fa7a29b960b4511902bac81abce385e.jpg', '5', '2', '0', '10', '中国香港', '2017-10-27', '40', '2017-12-19 22:20:44');

-- ----------------------------
-- Table structure for `moviecol`
-- ----------------------------
DROP TABLE IF EXISTS `moviecol`;
CREATE TABLE `moviecol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movie_id` (`movie_id`),
  KEY `user_id` (`user_id`),
  KEY `ix_moviecol_addtime` (`addtime`),
  CONSTRAINT `moviecol_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `moviecol_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of moviecol
-- ----------------------------
INSERT INTO `moviecol` VALUES ('1', '7', '1', '2017-09-06 15:50:08');
INSERT INTO `moviecol` VALUES ('2', '7', '2', '2017-09-06 15:50:08');
INSERT INTO `moviecol` VALUES ('3', '7', '3', '2017-09-06 15:50:08');
INSERT INTO `moviecol` VALUES ('4', '7', '4', '2017-09-06 15:50:09');
INSERT INTO `moviecol` VALUES ('5', '8', '5', '2017-09-06 15:50:09');
INSERT INTO `moviecol` VALUES ('6', '8', '6', '2017-09-06 15:50:09');
INSERT INTO `moviecol` VALUES ('7', '8', '7', '2017-09-06 15:50:09');
INSERT INTO `moviecol` VALUES ('8', '11', '13', '2017-09-11 15:38:44');
INSERT INTO `moviecol` VALUES ('9', '8', '13', '2017-09-11 15:39:45');
INSERT INTO `moviecol` VALUES ('10', '12', '13', '2017-09-11 15:42:56');
INSERT INTO `moviecol` VALUES ('11', '9', '13', '2017-09-11 15:43:50');
INSERT INTO `moviecol` VALUES ('12', '10', '13', '2017-09-11 15:50:45');
INSERT INTO `moviecol` VALUES ('13', '7', '14', '2017-09-15 10:28:59');

-- ----------------------------
-- Table structure for `oplog`
-- ----------------------------
DROP TABLE IF EXISTS `oplog`;
CREATE TABLE `oplog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `reason` varchar(600) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  KEY `ix_oplog_addtime` (`addtime`),
  CONSTRAINT `oplog_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of oplog
-- ----------------------------
INSERT INTO `oplog` VALUES ('1', '1', '127.0.0.1', '添加标签悬疑', '2017-09-06 19:30:05');
INSERT INTO `oplog` VALUES ('2', '1', '127.0.0.1', '添加标签yeyilu', '2017-09-06 19:36:07');
INSERT INTO `oplog` VALUES ('3', '1', '127.0.0.1', '添加标签喜剧', '2017-09-07 11:06:12');
INSERT INTO `oplog` VALUES ('4', '1', '127.0.0.1', '添加标签冒险', '2017-09-15 10:33:13');
INSERT INTO `oplog` VALUES ('5', '1', '127.0.0.1', '添加标签冒险', '2017-09-15 11:16:53');

-- ----------------------------
-- Table structure for `preview`
-- ----------------------------
DROP TABLE IF EXISTS `preview`;
CREATE TABLE `preview` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  UNIQUE KEY `logo` (`logo`),
  KEY `ix_preview_addtime` (`addtime`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of preview
-- ----------------------------
INSERT INTO `preview` VALUES ('1', '一朝是战狼 终身是战狼', '2017090910485088605afd6ab442b8a07bb124b712a71c.jpg', '2017-09-09 10:48:51');
INSERT INTO `preview` VALUES ('2', '三生三世十里桃花', '201709091049446824b023458e467da24cab74dfddaa27.jpg', '2017-09-09 10:49:44');
INSERT INTO `preview` VALUES ('3', '君の名は。', '201709091050567c06b47981e74e9a9bf83bd98722f701.jpg', '2017-09-09 10:50:56');
INSERT INTO `preview` VALUES ('4', '蝙蝠侠大战超人：正义黎明', '201709091052115b74dd208f7849e78d3e92d018e808a5.jpg', '2017-09-09 10:52:12');
INSERT INTO `preview` VALUES ('5', '春娇救志明', '20170909105308e16e2e121bda460d902bd04666dbd5b9.jpg', '2017-09-09 10:53:08');

-- ----------------------------
-- Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `auths` varchar(600) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `ix_role_addtime` (`addtime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '超级管理员', '', '2017-08-30 12:50:22');
INSERT INTO `role` VALUES ('2', '标签管理员1', '1,3', '2017-09-07 20:29:22');

-- ----------------------------
-- Table structure for `tag`
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `ix_tag_addtime` (`addtime`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES ('10', '魔幻', '2017-09-04 19:01:40');
INSERT INTO `tag` VALUES ('11', '爱情', '2017-09-04 19:04:56');
INSERT INTO `tag` VALUES ('12', '神话', '2017-09-05 09:40:12');
INSERT INTO `tag` VALUES ('14', '恐怖', '2017-09-05 16:21:50');
INSERT INTO `tag` VALUES ('15', '剧情', '2017-09-06 18:32:16');
INSERT INTO `tag` VALUES ('16', '动作', '2017-09-06 18:34:20');
INSERT INTO `tag` VALUES ('17', '科幻', '2017-09-06 18:40:43');
INSERT INTO `tag` VALUES ('24', '悬疑', '2017-09-06 19:30:05');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `pwd` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `info` text,
  `face` varchar(255) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `face` (`face`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `ix_user_addtime` (`addtime`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '鼠', '1231', '1231@123.com', '13888888881', '鼠', '1f401.png', '2017-09-02 14:42:43', 'd32a72bdac524478b7e4f6dfc8394fc0');
INSERT INTO `user` VALUES ('2', '牛', '1232', '1232@123.com', '13888888882', '牛', '1f402.png', '2017-09-02 14:42:43', 'd32a72bdac524478b7e4f6dfc8394fc1');
INSERT INTO `user` VALUES ('3', '虎', '1233', '1233@123.com', '13888888883', '虎', '1f405.png', '2017-09-02 14:42:43', 'd32a72bdac524478b7e4f6dfc8394fc2');
INSERT INTO `user` VALUES ('4', '兔', '1234', '1234@123.com', '13888888884', '兔', '1f407.png', '2017-09-02 14:42:43', 'd32a72bdac524478b7e4f6dfc8394fc3');
INSERT INTO `user` VALUES ('5', '龙', '1235', '1235@123.com', '13888888885', '龙', '1f409.png', '2017-09-02 14:42:43', 'd32a72bdac524478b7e4f6dfc8394fc4');
INSERT INTO `user` VALUES ('6', '蛇', '1236', '1236@123.com', '13888888886', '蛇', '1f40d.png', '2017-09-02 14:42:43', 'd32a72bdac524478b7e4f6dfc8394fc5');
INSERT INTO `user` VALUES ('7', '马', '1237', '1237@123.com', '13888888887', '马', '1f434.png', '2017-09-02 14:42:43', 'd32a72bdac524478b7e4f6dfc8394fc6');
INSERT INTO `user` VALUES ('8', '羊', '1238', '1238@123.com', '13888888888', '羊', '1f411.png', '2017-09-02 14:42:43', 'd32a72bdac524478b7e4f6dfc8394fc7');
INSERT INTO `user` VALUES ('9', '猴', '1239', '1239@123.com', '13888888889', '猴', '1f412.png', '2017-09-02 14:42:43', 'd32a72bdac524478b7e4f6dfc8394fc8');
INSERT INTO `user` VALUES ('10', '鸡', '1240', '1240@123.com', '13888888891', '鸡', '1f413.png', '2017-09-02 14:42:43', 'd32a72bdac524478b7e4f6dfc8394fc9');
INSERT INTO `user` VALUES ('11', '狗', '1241', '1241@123.com', '13888888892', '狗', '1f415.png', '2017-09-02 14:42:43', 'd32a72bdac524478b7e4f6dfc8394fd0');
INSERT INTO `user` VALUES ('12', '猪', '1242', '1242@123.com', '13888888893', '猪', '1f416.png', '2017-09-02 14:42:45', 'd32a72bdac524478b7e4f6dfc8394fd1');
INSERT INTO `user` VALUES ('13', 'yeyilu', 'pbkdf2:sha256:50000$N3IHgLIq$a0bbeedc498fc71263bff2e994ca4d220ee95cf88f3118f8ada939a3068aa5f5', '1554916519@qq.com', '18024168123', '真相只有一个！', '2017091110042397ebc137d5254c058f2ad86160360aef.jpg', '2017-09-08 14:20:13', '7810f3c7f70445c3a89a8b0d3084b615');
INSERT INTO `user` VALUES ('14', 'xiaoming', 'pbkdf2:sha256:50000$W2KrMzKZ$ca44a6ed0a18fc66ad519d7d6fd05b52c563b9b639926952e493edbadc22963d', '123456@qq.com', '13267704822', '好好学习，天天向上！', '20170915102037b2b78c77f50145ff8442a871dc1c5205.png', '2017-09-15 10:18:25', '62ff809102504ca59cba2107e81410a5');
INSERT INTO `user` VALUES ('15', 'xiaohong', 'pbkdf2:sha256:50000$Hcvbxmae$a984062c6777ce50004b141fd9a8dbed1b0ca05faad21eef4510b31dbee3f651', '1111111111@qq.com', '13267704820', '好好学习，天天向上', '2017091511223674c4bc189aef4ff6b26e24cfdd5a588f.jpg', '2017-09-15 11:20:39', '9511cbea687d4656a94f42b05a711743');
INSERT INTO `user` VALUES ('16', '未闻花名', 'pbkdf2:sha256:50000$LBwyBbe9$ec83ea95f9191d2813535f9f59c320ae8bcd42fab158de8ca5fe726140101a0f', '1234567890@qq.com', '13267704821', '好好学习！天天向上 ！', '20170926214455745329c4c3e84b72ad3bc69142071c0f.jpg', '2017-09-26 21:44:23', 'a4466dc74c2c4a8f9c7de2a76ff7dbf7');

-- ----------------------------
-- Table structure for `userlog`
-- ----------------------------
DROP TABLE IF EXISTS `userlog`;
CREATE TABLE `userlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `ix_userlog_addtime` (`addtime`),
  CONSTRAINT `userlog_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userlog
-- ----------------------------
INSERT INTO `userlog` VALUES ('1', '1', '192.168.4.1', '2017-09-04 19:16:33');
INSERT INTO `userlog` VALUES ('2', '2', '192.168.4.2', '2017-09-04 19:16:33');
INSERT INTO `userlog` VALUES ('3', '3', '192.168.4.3', '2017-09-04 19:16:33');
INSERT INTO `userlog` VALUES ('4', '4', '192.168.4.4', '2017-09-04 19:16:33');
INSERT INTO `userlog` VALUES ('5', '5', '192.168.4.5', '2017-09-04 19:16:33');
INSERT INTO `userlog` VALUES ('6', '6', '192.168.4.6', '2017-09-04 19:16:33');
INSERT INTO `userlog` VALUES ('7', '7', '192.168.4.7', '2017-09-04 19:16:33');
INSERT INTO `userlog` VALUES ('8', '8', '192.168.4.8', '2017-09-04 19:16:33');
INSERT INTO `userlog` VALUES ('9', '9', '192.168.4.9', '2017-09-04 19:16:33');
INSERT INTO `userlog` VALUES ('10', '13', '127.0.0.1', '2017-09-08 15:29:13');
INSERT INTO `userlog` VALUES ('11', '13', '127.0.0.1', '2017-09-08 19:05:54');
INSERT INTO `userlog` VALUES ('12', '13', '127.0.0.1', '2017-09-08 19:07:15');
INSERT INTO `userlog` VALUES ('13', '13', '127.0.0.1', '2017-09-08 19:55:11');
INSERT INTO `userlog` VALUES ('14', '13', '127.0.0.1', '2017-09-08 19:56:28');
INSERT INTO `userlog` VALUES ('15', '13', '127.0.0.1', '2017-09-08 20:28:42');
INSERT INTO `userlog` VALUES ('16', '13', '127.0.0.1', '2017-09-09 16:35:57');
INSERT INTO `userlog` VALUES ('17', '13', '127.0.0.1', '2017-09-09 16:37:40');
INSERT INTO `userlog` VALUES ('18', '13', '127.0.0.1', '2017-09-10 14:52:49');
INSERT INTO `userlog` VALUES ('19', '13', '127.0.0.1', '2017-09-10 16:17:21');
INSERT INTO `userlog` VALUES ('20', '13', '127.0.0.1', '2017-09-10 17:08:34');
INSERT INTO `userlog` VALUES ('21', '13', '127.0.0.1', '2017-09-10 22:30:51');
INSERT INTO `userlog` VALUES ('22', '13', '127.0.0.1', '2017-09-11 10:02:12');
INSERT INTO `userlog` VALUES ('23', '13', '127.0.0.1', '2017-09-11 14:38:27');
INSERT INTO `userlog` VALUES ('24', '13', '127.0.0.1', '2017-09-13 11:31:22');
INSERT INTO `userlog` VALUES ('25', '14', '127.0.0.1', '2017-09-15 10:18:38');
INSERT INTO `userlog` VALUES ('26', '15', '127.0.0.1', '2017-09-15 11:20:49');
INSERT INTO `userlog` VALUES ('27', '13', '127.0.0.1', '2017-09-26 21:42:29');
INSERT INTO `userlog` VALUES ('28', '16', '127.0.0.1', '2017-09-26 21:44:35');
