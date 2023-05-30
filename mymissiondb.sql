-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2021 at 07:14 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mymissiondb`
--
CREATE DATABASE IF NOT EXISTS `mymissiondb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mymissiondb`;

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `meetingId` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `description` varchar(200) NOT NULL,
  `room` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`meetingId`, `teamId`, `startDate`, `endDate`, `description`, `room`) VALUES
(1, 1, '2021-02-08 13:22:19', '2021-02-08 16:41:41', 'Web Dev meeting', 'Blue Room'),
(2, 2, '2021-02-10 13:22:19', '2021-02-10 16:41:41', 'HR meeting', 'White Room'),
(3, 2, '2021-02-11 13:22:19', '2021-02-11 16:41:41', 'HR meeting', 'Blue Room'),
(4, 1, '2021-02-08 11:22:19', '2021-02-08 14:41:41', 'Web Dev meeting', 'Blue Room'),
(6, 1, '2021-02-17 02:01:00', '2021-03-03 13:01:00', 'Dev Ops', 'White Room'),
(9, 1, '2021-02-23 20:35:00', '2021-02-28 02:35:00', 'Devs', 'White Room'),
(10, 3, '2021-02-24 20:46:00', '2021-03-01 20:46:00', 'UI Meeting', 'Black Room'),
(11, 3, '2021-02-16 20:52:00', '2021-02-16 23:48:00', 'UI Meeting', 'Blue Room'),
(12, 1, '2021-02-12 23:05:00', '2021-02-19 00:06:00', '1111', '2222'),
(13, 2, '2021-02-20 00:07:00', '2021-02-20 00:07:00', '11111', '22222'),
(14, 2, '2021-02-20 00:08:00', '2021-02-13 00:08:00', '55555', ''),
(15, 3, '2021-02-04 21:18:00', '2021-02-25 21:13:00', 'abc', 'Blue Room');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `teamId` int(11) NOT NULL,
  `team` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`teamId`, `team`) VALUES
(1, 'React Team'),
(2, 'Mobile Team'),
(3, 'UI Team');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`meetingId`),
  ADD KEY `teamId` (`teamId`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`teamId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `meetingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `teamId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `meetings`
--
ALTER TABLE `meetings`
  ADD CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `teams` (`teamId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
