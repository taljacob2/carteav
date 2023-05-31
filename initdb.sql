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
  CONSTRAINT `cinemas_ibfk_5` FOREIGN KEY (`seat1`) REFERENCES `logs` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cinemas_ibfk_6` FOREIGN KEY (`seat2`) REFERENCES `logs` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cinemas_ibfk_7` FOREIGN KEY (`seat3`) REFERENCES `logs` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cinemas_ibfk_8` FOREIGN KEY (`seat4`) REFERENCES `logs` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `cinemas` (`id`, `time`, `seat1`, `seat2`, `seat3`, `seat4`) VALUES
(1,	'2023-05-30 10:37:18',	101,	NULL,	NULL,	NULL),
(2,	'2023-05-30 10:37:24',	NULL,	89,	NULL,	95),
(3,	'2023-05-30 10:37:26',	NULL,	NULL,	NULL,	NULL);

CREATE TABLE `logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `value` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `timestamp` datetime NOT NULL,
  `approved` tinyint NOT NULL,
  `seatNumber` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `cinemaId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `cinemaId` (`cinemaId`),
  CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `logs_ibfk_2` FOREIGN KEY (`cinemaId`) REFERENCES `cinemas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `logs` (`id`, `userId`, `value`, `timestamp`, `approved`, `seatNumber`, `cinemaId`) VALUES
(89,	1,	'admin approved',	'2023-05-31 08:17:38',	1,	'seat2',	2),
(90,	1,	'admin declined',	'2023-05-31 08:18:07',	0,	'seat3',	2),
(91,	1,	'The seat was not approved in the limited time',	'2023-05-31 08:35:03',	0,	'seat4',	2),
(92,	2,	'The seat was not approved in the limited time',	'2023-05-31 08:49:15',	0,	'seat1',	1),
(93,	2,	'admin declined',	'2023-05-31 08:52:35',	0,	'seat1',	2),
(94,	1,	'admin declined',	'2023-05-31 08:53:51',	0,	'seat4',	2),
(95,	1,	'admin approved',	'2023-05-31 08:54:02',	1,	'seat4',	2),
(96,	2,	'The seat was not approved in the limited time',	'2023-05-31 08:54:46',	0,	'seat3',	1),
(97,	2,	'The seat was not approved in the limited time',	'2023-05-31 08:57:52',	0,	'seat1',	2),
(98,	1,	'The seat was not approved in the limited time',	'2023-05-31 09:15:41',	0,	'seat4',	1),
(99,	2,	'The seat was not approved in the limited time',	'2023-05-31 09:30:35',	0,	'seat1',	1),
(100,	1,	'admin declined',	'2023-05-31 09:53:13',	0,	'seat1',	2),
(101,	1,	'waiting for approval',	'2023-05-31 09:57:01',	0,	'seat1',	1);

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `username`) VALUES
(1,	'admin'),
(2,	'tal'),
(5,	'tal2');

-- 2023-05-31 09:59:06