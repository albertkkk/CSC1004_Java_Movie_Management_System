/*
SQLyog Enterprise v12.09 (64 bit)
MySQL - 5.7.15 : Database - moviesdata
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`moviesdata` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `moviesdata`;

/*Table structure for table `allmovies` */

DROP TABLE IF EXISTS `allmovies`;

CREATE TABLE `allmovies` (
  `id` int(255) NOT NULL AUTO_INCREMENT COMMENT '电影id',
  `name` varchar(255) DEFAULT NULL COMMENT '电影名字',
  `score` int(255) DEFAULT NULL COMMENT '电影评分',
  `director` varchar(255) DEFAULT NULL COMMENT '导演',
  `scriptwriter` varchar(255) DEFAULT NULL COMMENT '编剧',
  `actor` mediumtext COMMENT '演员',
  `years` varchar(255) DEFAULT NULL COMMENT '上映日期',
  `country` varchar(255) DEFAULT NULL COMMENT '国家',
  `languages` varchar(255) DEFAULT NULL COMMENT '语言',
  `length` varchar(255) DEFAULT NULL COMMENT '片长',
  `image` varchar(255) DEFAULT NULL COMMENT '电影图片地址',
  `des` mediumtext COMMENT '电影简介',
  `url` varchar(255) DEFAULT NULL COMMENT '电影播放地址',
  `type` varchar(255) DEFAULT NULL COMMENT '电影类型',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=945 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `allmovies` */

insert  into `allmovies`(`id`,`name`,`score`,`director`,`scriptwriter`,`actor`,`years`,`country`,`languages`,`length`,`image`,`des`,`url`,`type`) values (1,'哪吒之魔童降世',9,'饺子、','饺子、易巧、魏芸芸、','吕艳婷、囧森瑟夫、瀚墨、陈浩、绿绮、张珈铭、杨卫、','2023',' 中国大陆',' 汉语普通话','110分钟','donghua//1.jpg','\n                                　　天地灵气孕育出一颗能量巨大的混元珠，元始天尊将混元珠提炼成灵珠和魔丸，灵珠投胎为人，助周伐纣时可堪大用；而魔丸则会诞出魔王，为祸人间。元始天尊启动了天劫咒语，3年后天雷将会降临，摧毁魔丸。太乙受命将灵珠托生于陈塘关李靖家的儿子哪吒身上。然而阴差阳错，灵珠和魔丸竟然被掉包。本应是灵珠英雄的哪吒却成了混世大魔王。调皮捣蛋顽劣不堪的哪吒却徒有一颗做英雄的心。然而面对众人对魔丸的误解和即将来临的天雷的降临，哪吒是否命中注定会立地成魔？他将何去何从？\n                        ','https://www.douban.com/link2/?url=https%3A%2F%2Fwww.iqiyi.com%2Fv_19rrcuke28.html&subtype=9&type=online-video','动画'),(2,'罗小黑战记',8,'木头、','木头、','山新、郝祥海、刘明月、','2023',' 中国大陆',' 汉语普通话','101分钟','donghua//2.jpg','\n                                　　在熙攘的人类世界里，很多妖精隐匿其中，他们与人类相安无事地生活着。猫妖罗小黑因为家园被破坏，开始了它的流浪之旅。这场旅途中惺惺相惜的妖精同类与和谐包容的人类伙伴相继出现，让小黑陷入了两难抉择，究竟何处才是真正的归属？\n                                    \n                                　　\n                        ','https://www.douban.com/link2/?url=http%3A%2F%2Fwww.iqiyi.com%2Fv_19rtszgos4.html%3Fvfm%3Dm_331_dbdy%26fv%3D4904d94982104144a1548dd9040df241&subtype=9&type=online-video','动画'),(3,'航海王：狂热行动 ONE PIECE STAMPEDE',8,'大塚隆史、','尾田荣一郎、大塚隆史、富冈淳广、','田中真弓、冈村明美、中井和哉、山口胜平、平田广明、大谷育江、山口由里子、矢尾一树、长岛雄一、古谷彻、千叶繁、三石琴乃、神谷浩史、大场真人、关智一、大友龙三郎、挂川裕彦、西原久美子、岛田敏、桧山修之、松冈洋子、浪川大辅、真殿光昭、龙田直树、竹本英史、楠大典、宗矢树赖、高木礼子、滨田贤二、加濑康之、森久保祥太郎、石田彰、大川透、中博史、立木文彦、置鲇龙太郎、泽木郁也、中友子、野田顺子、土井美加、永野广一、伊仓一惠、太田真一郎、花田光、小山刚志、服卷浩司、山田真一、高冢正也 、平井启二、清水健佑、田边幸辅、坂井易直、寺崎千波也、美藤大树、内海安希子、柴田平美、千须和侑里子、细田启信、堤勇高、日野佑希人、藤井弘辉、小川功二、大森万梨乃、河谷麻瑚、坂本刚史、柴田美奈、川岛壮雄、冈部枫子、森夏美、加藤雅也、福吉贵文、藤尾悠、新垣泉子、中原理菜、高桥幸、金井杏树、小山波留、辻本祐佳、渡边清子、大门桃子、岩崎广辉、山本凉介、岩上隼也、龙梦柔、竹中直人、指原莉乃、山里亮太、中山裕介、津嘉山正种、大塚明夫、园部启一、古川登志夫、矶部勉、','2023',' 日本',' 日语','101分钟','donghua//3.jpg','\n                                　　《航海王：狂热行动》是“航海王系列”第14部剧场版，也是《航海王》动画二十周年纪念之作。\n                                    \n                                　　以超新星为代表的众多航海家纷纷现身世界最大的航海家庆典——航海世博会。草帽航海团也收到了主办者费斯塔的邀请函，搭乘万里阳光号前往。原以为航海家们的狂热世博会只是为争夺“航海王罗杰留下的宝藏”，就在神秘宝藏争夺战如火如荼之际，阻挡在路飞等人面前的可怕威胁道格拉斯·巴雷特突然现身！暗藏阴谋的敌我混战一触即发……\n                        ',NULL,'动画');

/*Table structure for table `clicknumber` */

DROP TABLE IF EXISTS `clicknumber`;

CREATE TABLE `clicknumber` (
  `movieid` int(11) NOT NULL COMMENT '电影名',
  `number` int(11) DEFAULT '1' COMMENT '电影被点击的次数',
  PRIMARY KEY (`movieid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `clicknumber` */

insert  into `clicknumber`(`movieid`,`number`) values (1,1),(2,2),(3,2);

/*Table structure for table `collection` */

DROP TABLE IF EXISTS `collection`;

CREATE TABLE `collection` (
  `userName` varchar(200) NOT NULL COMMENT '用户ID',
  `movieid` int(11) NOT NULL COMMENT '电影ID',
  `addTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userName`,`movieid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `collection` */

insert  into `collection`(`userName`,`movieid`,`addTime`) values ('11',1,'2023-04-21 12:15:38'),('11',2,'2023-04-21 12:15:39'),('gg',3,'2023-04-21 12:15:40');

/*Table structure for table `comments` */

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `userName` varchar(255) NOT NULL COMMENT '用户ID',
  `movieid` int(11) NOT NULL COMMENT '电影ID',
  `description` varchar(250) DEFAULT 'null' COMMENT '用户对电影的评论',
  `addTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '添加评论的时间\r\n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `comments` */

insert  into `comments`(`userName`,`movieid`,`description`,`addTime`) values ('11',3,'sdfa s','2023-04-21 14:35:11'),('11',3,'ewt e','2023-04-21 14:37:55'),('11',3,'wqet wqe','2023-04-21 14:38:00'),('11',3,'sad sdgadsg df','2023-04-21 14:38:57'),('11',3,'sdg ','2023-04-21 14:40:50'),('11',3,'sdhsd','2023-04-21 14:42:01');

/*Table structure for table `score` */

DROP TABLE IF EXISTS `score`;

CREATE TABLE `score` (
  `movieid` int(50) NOT NULL COMMENT '电影id，关联movies表中的主键',
  `userid` int(50) NOT NULL COMMENT '用户id，关联users表中的主键',
  `score` int(10) DEFAULT NULL COMMENT '用户对电影的评分',
  PRIMARY KEY (`movieid`,`userid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `score` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '系统自动编号，自增',
  `username` varchar(20) NOT NULL DEFAULT 'null' COMMENT '用户名称',
  `password` varchar(20) DEFAULT 'null' COMMENT '用户密码',
  `gender` varchar(4) DEFAULT 'null' COMMENT '用户性别',
  `email` varchar(50) DEFAULT 'null' COMMENT '用户邮箱',
  `telephone` varchar(20) DEFAULT 'null' COMMENT '用户电话',
  `introduce` varchar(100) DEFAULT '这家伙很懒，还没有添加任何描述' COMMENT '自我介绍',
  `activeCode` varchar(50) DEFAULT 'null' COMMENT '注册激活码',
  `state` int(11) DEFAULT '1' COMMENT '用户状态：1:激活 0：未激活',
  `role` varchar(10) DEFAULT 'commonUser' COMMENT '用户角色：普通用户，超级用户，VIP用户',
  `registTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '注册时间',
  PRIMARY KEY (`id`,`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `users` */

insert  into `users`(`id`,`username`,`password`,`gender`,`email`,`telephone`,`introduce`,`activeCode`,`state`,`role`,`registTime`) values (1,'admin','123456','男','111@qq.com','18888888888','管理员','1024',1,'admin','2023-10-24 11:12:31'),(3,'gg','123','男','123@qq.com',NULL,'Rush B',NULL,1,'commonUser','2023-04-11 20:15:05'),(5,'mm','123',NULL,'mm@123.com',NULL,'唱、跳、rap、篮球',NULL,1,'commonUser','2023-04-11 20:16:32'),(8,'ss','ss','null',NULL,'null','这家伙很懒，还没有添加任何描述','null',1,'commonUser','2023-04-15 14:23:57'),(9,'123','123','null',NULL,'null','这家伙很懒，还没有添加任何描述','null',1,'commonUser','2023-04-15 22:56:39'),(10,'11','22','null','123@qq.com','null','sdg','null',1,'commonUser','2023-04-21 14:44:15');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
