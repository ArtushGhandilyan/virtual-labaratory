USE `virtual_laboratory`;

/*Table structure for table `permission` */

DROP TABLE IF EXISTS `permission`;

CREATE TABLE `permission` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT 'Permission identifier.',
  `name` varchar(255) NOT NULL COMMENT 'Permission name.',
  `description` varchar(255) DEFAULT NULL COMMENT 'permission description.',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT 'Role identifier.',
  `name` varchar(255) NOT NULL COMMENT 'Role name.',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Table structure for table `role_permission` */

DROP TABLE IF EXISTS `role_permission`;

CREATE TABLE `role_permission` (
  `role_id` int(20) NOT NULL COMMENT 'Role identifier.',
  `permission_id` int(20) NOT NULL COMMENT 'Permission identifier.',
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier of user',
  `first_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'First name of user',
  `last_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'Last name of user',
  `email` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'Email address of user',
  `password` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'Password of user in encoded form',
  `role_id` int(20) NOT NULL COMMENT 'User role identifier.',
  `is_enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Flag if account is enabled.',
  `registration_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'The time, when user registered.',
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
