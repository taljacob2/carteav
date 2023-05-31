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
(1,	'2023-05-30 10:37:18',	NULL,	NULL,	NULL,	NULL),
(2,	'2023-05-30 10:37:24',	82,	NULL,	79,	NULL),
(3,	'2023-05-30 10:37:26',	NULL,	NULL,	NULL,	NULL);

CREATE TABLE `logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `value` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `timestamp` datetime NOT NULL,
  `approved` tinyint NOT NULL,
  `seatNumber` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `logs` (`id`, `userId`, `value`, `timestamp`, `approved`, `seatNumber`) VALUES
(1,	1,	'waiting for approval',	'2023-05-30 11:38:44',	0,	''),
(2,	1,	'waiting for approval',	'2023-05-30 11:41:42',	0,	''),
(3,	1,	'waiting for approval',	'2023-05-30 11:41:43',	0,	''),
(4,	1,	'waiting for approval',	'2023-05-30 11:42:18',	0,	''),
(5,	1,	'waiting for approval',	'2023-05-30 11:43:43',	0,	''),
(6,	1,	'waiting for approval',	'2023-05-30 11:43:58',	0,	''),
(7,	1,	'waiting for approval',	'2023-05-30 11:45:52',	0,	''),
(8,	1,	'waiting for approval',	'2023-05-30 11:47:30',	0,	''),
(9,	1,	'waiting for approval',	'2023-05-30 14:02:31',	0,	''),
(10,	1,	'waiting for approval',	'2023-05-30 14:04:36',	0,	''),
(11,	1,	'waiting for approval',	'2023-05-30 14:04:55',	0,	''),
(12,	1,	'waiting for approval',	'2023-05-30 14:06:47',	0,	''),
(13,	1,	'waiting for approval',	'2023-05-30 14:08:09',	1,	''),
(14,	1,	'waiting for approval',	'2023-05-30 14:10:26',	1,	''),
(15,	1,	'waiting for approval',	'2023-05-30 17:30:57',	0,	''),
(16,	1,	'waiting for approval',	'2023-05-30 17:31:02',	0,	''),
(17,	1,	'waiting for approval',	'2023-05-30 17:31:02',	0,	''),
(18,	1,	'waiting for approval',	'2023-05-30 17:31:03',	0,	''),
(19,	1,	'waiting for approval',	'2023-05-30 17:32:53',	0,	''),
(20,	1,	'waiting for approval',	'2023-05-30 17:33:41',	0,	''),
(21,	1,	'waiting for approval',	'2023-05-30 17:35:51',	0,	''),
(22,	1,	'waiting for approval',	'2023-05-30 17:43:46',	0,	''),
(23,	1,	'waiting for approval',	'2023-05-30 17:44:22',	0,	''),
(24,	1,	'waiting for approval',	'2023-05-30 17:46:44',	0,	''),
(25,	1,	'waiting for approval',	'2023-05-30 17:46:52',	0,	''),
(26,	1,	'waiting for approval',	'2023-05-30 17:46:56',	0,	''),
(27,	1,	'waiting for approval',	'2023-05-30 17:46:59',	0,	''),
(28,	1,	'waiting for approval',	'2023-05-30 17:47:01',	0,	''),
(29,	1,	'waiting for approval',	'2023-05-30 18:04:01',	0,	''),
(30,	1,	'The seat was not approved in the limited time',	'2023-05-30 18:04:01',	0,	''),
(31,	1,	'The seat was not approved in the limited time',	'2023-05-30 18:04:01',	0,	''),
(32,	1,	'admin declined',	'2023-05-30 18:06:07',	0,	''),
(33,	1,	'waiting for approval',	'2023-05-30 19:17:36',	0,	''),
(34,	1,	'waiting for approval',	'2023-05-30 19:17:36',	0,	''),
(35,	1,	'The seat was not approved in the limited time',	'2023-05-30 19:17:37',	0,	''),
(36,	1,	'The seat was not approved in the limited time',	'2023-05-30 20:08:32',	0,	''),
(37,	1,	'The seat was not approved in the limited time',	'2023-05-30 20:12:07',	0,	''),
(38,	1,	'admin approved',	'2023-05-30 20:12:41',	1,	''),
(39,	1,	'The seat was not approved in the limited time',	'2023-05-30 20:28:17',	0,	''),
(40,	1,	'The seat was not approved in the limited time',	'2023-05-30 20:44:29',	0,	''),
(41,	1,	'The seat was not approved in the limited time',	'2023-05-30 20:53:24',	0,	''),
(42,	1,	'The seat was not approved in the limited time',	'2023-05-30 20:57:49',	0,	''),
(43,	1,	'The seat was not approved in the limited time',	'2023-05-30 21:05:06',	0,	''),
(44,	1,	'The seat was not approved in the limited time',	'2023-05-30 21:05:58',	0,	''),
(45,	1,	'admin declined',	'2023-05-30 21:42:07',	1,	'seat2'),
(46,	1,	'admin approved',	'2023-05-30 21:42:39',	1,	'seat3'),
(47,	1,	'admin declined',	'2023-05-30 21:44:14',	0,	'seat3'),
(48,	1,	'The seat was not approved in the limited time',	'2023-05-30 21:47:00',	0,	'seat2'),
(49,	1,	'The seat was not approved in the limited time',	'2023-05-30 21:52:20',	0,	'seat3'),
(50,	1,	'admin declined',	'2023-05-30 21:52:40',	0,	'seat1'),
(51,	1,	'admin approved',	'2023-05-30 21:52:50',	1,	'seat1'),
(52,	1,	'waiting for approval',	'2023-05-30 21:53:01',	0,	'seat1'),
(53,	1,	'waiting for approval',	'2023-05-30 21:53:05',	0,	'seat1'),
(54,	1,	'admin declined',	'2023-05-30 21:53:05',	0,	'seat1'),
(55,	1,	'waiting for approval',	'2023-05-30 21:53:25',	0,	'seat1'),
(56,	1,	'admin declined',	'2023-05-30 21:53:25',	0,	'seat1'),
(57,	1,	'The seat was not approved in the limited time',	'2023-05-30 21:53:45',	0,	'seat1'),
(58,	1,	'waiting for approval',	'2023-05-30 21:53:50',	0,	'seat1'),
(59,	1,	'waiting for approval',	'2023-05-30 21:53:55',	0,	'seat1'),
(60,	1,	'waiting for approval',	'2023-05-30 21:53:56',	0,	'seat1'),
(61,	1,	'waiting for approval',	'2023-05-30 21:53:56',	0,	'seat1'),
(62,	1,	'waiting for approval',	'2023-05-30 21:53:57',	0,	'seat1'),
(63,	1,	'waiting for approval',	'2023-05-30 21:53:57',	0,	'seat1'),
(64,	1,	'waiting for approval',	'2023-05-30 21:53:57',	0,	'seat1'),
(65,	1,	'waiting for approval',	'2023-05-30 21:53:58',	0,	'seat1'),
(66,	1,	'waiting for approval',	'2023-05-30 21:53:58',	0,	'seat1'),
(67,	1,	'waiting for approval',	'2023-05-30 21:53:59',	0,	'seat1'),
(68,	1,	'waiting for approval',	'2023-05-30 21:53:59',	0,	'seat1'),
(69,	1,	'waiting for approval',	'2023-05-30 21:54:00',	0,	'seat1'),
(70,	1,	'waiting for approval',	'2023-05-30 21:54:00',	0,	'seat1'),
(71,	1,	'admin declined',	'2023-05-30 21:54:01',	0,	'seat1'),
(72,	1,	'The seat was not approved in the limited time',	'2023-05-30 22:02:52',	0,	'seat1'),
(73,	1,	'The seat was not approved in the limited time',	'2023-05-31 05:21:12',	0,	'seat1'),
(74,	1,	'The seat was not approved in the limited time',	'2023-05-31 05:26:37',	0,	'seat3'),
(75,	1,	'The seat was not approved in the limited time',	'2023-05-31 06:00:33',	0,	'seat1'),
(76,	1,	'admin declined',	'2023-05-31 06:00:35',	0,	'seat2'),
(77,	1,	'admin declined',	'2023-05-31 06:08:10',	0,	'seat2'),
(78,	1,	'admin declined',	'2023-05-31 06:10:12',	0,	'seat2'),
(79,	1,	'admin approved',	'2023-05-31 06:10:52',	1,	'seat3'),
(80,	1,	'admin declined',	'2023-05-31 06:26:28',	0,	'seat2'),
(81,	1,	'admin declined',	'2023-05-31 06:45:18',	1,	'seat2'),
(82,	1,	'admin approved',	'2023-05-31 06:48:08',	1,	'seat1'),
(83,	1,	'admin declined',	'2023-05-31 07:03:41',	0,	'seat2'),
(84,	1,	'admin declined',	'2023-05-31 07:03:50',	0,	'seat4'),
(86,	1,	'The seat was not approved in the limited time',	'2023-05-31 07:11:40',	0,	'seat2'),
(87,	1,	'The seat was not approved in the limited time',	'2023-05-31 07:27:35',	0,	'seat2'),
(88,	1,	'admin declined',	'2023-05-31 07:27:47',	0,	'seat3');

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `username`) VALUES
(1,	'admin'),
(2,	'tal');

-- 2023-05-31 08:01:51