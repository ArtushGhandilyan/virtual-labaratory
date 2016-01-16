-- // First migration.
-- Migration SQL that makes the change goes here.
insert  into `permission`(`id`,`name`,`description`) values (1,'User management','Create, edit, delete users in system.'),(2,'Experiment management','Create, edit, delete experiments.');
insert  into `role`(`id`,`name`) values (1,'Student'),(2,'Teacher'),(3,'Admin');
insert  into `role_permission`(`role_id`,`permission_id`) values (3,1),(2,2),(3,2);
insert  into `user`(`id`,`first_name`,`last_name`,`email`,`password`,`role_id`,`is_enabled`,`registration_date`) values (1,'Student','Student','student@test.com','password',1,1,'2016-01-15 23:30:39'),(2,'Teacher','Teacher','teacher@test.com','password',2,1,'2016-01-15 23:31:02'),(3,'Admin','Admin','admin@test.com','password',3,1,'2016-01-15 23:31:16');

-- //@UNDO
-- SQL to undo the change goes here.
DELETE FROM `user`;
DELETE FROM `role_permission`;
DELETE FROM `role`;
DELETE FROM `permission`;

