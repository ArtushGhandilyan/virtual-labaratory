-- // First migration.
-- Migration SQL that makes the change goes here.
insert  into `permission`(`id`,`name`,`description`) values (1,'User management','Create, edit, delete users in system.'),(2,'Experiment management','Create, edit, delete experiments.');
insert  into `role`(`id`,`name`) values (1,'Student'),(2,'Teacher'),(3,'Admin'),(4,'Guest');
insert  into `role_permission`(`role_id`,`permission_id`) values (3,1),(2,2),(3,2);
insert  into `user`(`id`,`first_name`,`last_name`,`email`,`password`,`role_id`,`is_enabled`,`registration_date`) values (1,'Student','Studentovich','student@test.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',1,1,'2016-01-15 23:30:39'),(2,'Teacher','Teacherovich','teacher@test.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',2,1,'2016-01-15 23:31:02'),(3,'Admin','Adminovich','admin@test.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',3,1,'2016-01-15 23:31:16'),(4,'Guest','Guestovich','guest@test.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',4,1,'2016-01-15 23:31:16');

-- //@UNDO
-- SQL to undo the change goes here.
DELETE FROM `user`;
DELETE FROM `role_permission`;
DELETE FROM `role`;
DELETE FROM `permission`;

