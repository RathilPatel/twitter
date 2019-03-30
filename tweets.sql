-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2019 at 11:40 AM
-- Server version: 5.7.14
-- PHP Version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `twitterdata`
--

-- --------------------------------------------------------

--
-- Table structure for table `tweets`
--

CREATE TABLE `tweets` (
  `tweets` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `screenname` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `descp` varchar(5000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `points` bigint(20) NOT NULL,
  `addedate` timestamp NOT NULL,
  `murl` mediumtext COLLATE utf8mb4_unicode_ci,
  `mstart` mediumtext COLLATE utf8mb4_unicode_ci,
  `mend` mediumtext COLLATE utf8mb4_unicode_ci,
  `type` mediumtext COLLATE utf8mb4_unicode_ci,
  `tid` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Indexes for table `tweets`
--
ALTER TABLE `tweets`
  ADD PRIMARY KEY (`tid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
