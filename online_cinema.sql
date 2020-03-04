CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `info` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `sex` char(1) DEFAULT '3' COMMENT '性别, 1:男，2:女，3：保密',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7122 DEFAULT CHARSET=utf8 COMMENT='用户表'