use online_cinema;
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
) ENGINE=InnoDB AUTO_INCREMENT=7122 DEFAULT CHARSET=utf8 COMMENT='用户表';


CREATE TABLE `usersLog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `ip` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `users_id` bigint(20) DEFAULT NULL,
  FOREIGN KEY (users_id) REFERENCES users(id),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` varchar(50) DEFAULT NULL,
  `users_id` bigint(20) DEFAULT NULL,
  FOREIGN KEY (users_id) REFERENCES users(id),
  FOREIGN KEY (movie_id) REFERENCES mv_info(id),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15579 DEFAULT CHARSET=utf8;