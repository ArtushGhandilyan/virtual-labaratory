-- // create config property table
-- Migration SQL that makes the change goes here.
CREATE TABLE `config_property` (
  `property_id` int(20) NOT NULL AUTO_INCREMENT COMMENT 'Contains property identifier.',
  `property_name` varchar(50) NOT NULL COMMENT 'Contains property unique name.',
  `property_value` varchar(255) NOT NULL COMMENT 'Contains property value.',
  `property_description` varchar(255) DEFAULT NULL COMMENT 'Contains optional property description.',
  PRIMARY KEY (`property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='Contains configuration properties.';

insert  into `config_property`(`property_id`,`property_name`,`property_value`,`property_description`) values (1,'gauss_files_base_folder_path','C:\\apache-tomcat-8.0.5\\webapps\\gauss_files\\',NULL);


-- //@UNDO
-- SQL to undo the change goes here.
DROP TABLE IF EXISTS `config_property`;


