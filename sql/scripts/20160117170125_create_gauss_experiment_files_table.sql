-- // create gauss experiment files table
-- Migration SQL that makes the change goes here.
CREATE TABLE `gauss_experiment_files`(
  `id` INT(20) NOT NULL AUTO_INCREMENT COMMENT 'File identifier.',
  `access` INT(1) NOT NULL COMMENT '0-Private, 1-Registered Users, 2-Public',
  `name` VARCHAR(255) NOT NULL COMMENT 'File display name.',
  `userId` INT(20) NOT NULL COMMENT 'File uploaded user identifier.',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `user`(`id`)
);



-- //@UNDO
-- SQL to undo the change goes here.
DROP TABLE IF EXISTS `gauss_experiment_files`;


