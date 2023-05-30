-- Adminer 4.8.1 MySQL 8.0.31 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `cinemadb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cinemadb`;

CREATE TABLE `cinemas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time` datetime NOT NULL,
  `seat1` int DEFAULT NULL,
  `seat2` int DEFAULT NULL,
  `seat3` int DEFAULT NULL,
  `seat4` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `seat1` (`seat1`),
  KEY `seat2` (`seat2`),
  KEY `seat3` (`seat3`),
  KEY `seat4` (`seat4`),
  CONSTRAINT `cinemas_ibfk_1` FOREIGN KEY (`seat1`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cinemas_ibfk_2` FOREIGN KEY (`seat2`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cinemas_ibfk_3` FOREIGN KEY (`seat3`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cinemas_ibfk_4` FOREIGN KEY (`seat4`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `cinemas` (`id`, `time`, `seat1`, `seat2`, `seat3`, `seat4`) VALUES
(1,	'2023-05-30 10:37:18',	NULL,	NULL,	NULL,	NULL),
(2,	'2023-05-30 10:37:24',	NULL,	NULL,	NULL,	NULL),
(3,	'2023-05-30 10:37:26',	NULL,	NULL,	NULL,	NULL);

CREATE TABLE `logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `value` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- 2023-05-30 10:41:42