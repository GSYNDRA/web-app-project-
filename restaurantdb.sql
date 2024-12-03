/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `Account`;
CREATE TABLE `Account` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleID` int DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `email` (`email`),
  KEY `roleID` (`roleID`),
  CONSTRAINT `Account_ibfk_1` FOREIGN KEY (`roleID`) REFERENCES `Role` (`roleID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Admin`;
CREATE TABLE `Admin` (
  `AdminID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `adminName` varchar(255) NOT NULL,
  PRIMARY KEY (`AdminID`),
  KEY `userID` (`userID`),
  CONSTRAINT `Admin_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Account` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Choose`;
CREATE TABLE `Choose` (
  `chooseID` int NOT NULL AUTO_INCREMENT,
  `customerID` int DEFAULT NULL,
  `itemID` int DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`chooseID`),
  KEY `customerID` (`customerID`),
  KEY `itemID` (`itemID`),
  CONSTRAINT `Choose_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `Customer` (`customerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Choose_ibfk_2` FOREIGN KEY (`itemID`) REFERENCES `Menu_Item` (`itemID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Choose_chk_1` CHECK ((`price` >= 0)),
  CONSTRAINT `Choose_chk_2` CHECK ((`quantity` > 0)),
  CONSTRAINT `Choose_chk_3` CHECK ((`status` in (_utf8mb4'order',_utf8mb4'process',_utf8mb4'served')))
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Customer`;
CREATE TABLE `Customer` (
  `customerID` int NOT NULL AUTO_INCREMENT,
  `tableID` int DEFAULT NULL,
  `customerName` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `age` int DEFAULT NULL,
  PRIMARY KEY (`customerID`),
  KEY `tableID` (`tableID`),
  CONSTRAINT `Customer_ibfk_1` FOREIGN KEY (`tableID`) REFERENCES `TableEntity` (`tableID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Customer_chk_1` CHECK ((`Age` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Menu_Item`;
CREATE TABLE `Menu_Item` (
  `itemID` int NOT NULL AUTO_INCREMENT,
  `itemName` varchar(255) NOT NULL,
  `type_of_food` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `descriptions` varchar(500) DEFAULT NULL,
  `preparation_time` float DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`itemID`),
  CONSTRAINT `Menu_Item_chk_1` CHECK ((`price` >= 0)),
  CONSTRAINT `Menu_Item_chk_2` CHECK ((`preparation_time` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Order`;
CREATE TABLE `Order` (
  `orderID` int NOT NULL AUTO_INCREMENT,
  `transactionID` int DEFAULT NULL,
  `chooseID` int DEFAULT NULL,
  PRIMARY KEY (`orderID`),
  KEY `transactionID` (`transactionID`),
  KEY `chooseID` (`chooseID`),
  CONSTRAINT `Order_ibfk_1` FOREIGN KEY (`transactionID`) REFERENCES `Transaction` (`transactionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Order_ibfk_2` FOREIGN KEY (`chooseID`) REFERENCES `Choose` (`chooseID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Role`;
CREATE TABLE `Role` (
  `roleID` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) NOT NULL,
  PRIMARY KEY (`roleID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `TableEntity`;
CREATE TABLE `TableEntity` (
  `tableID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `tableName` varchar(255) NOT NULL,
  `quantity` int DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`tableID`),
  KEY `userID` (`userID`),
  CONSTRAINT `TableEntity_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Account` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `TableEntity_chk_1` CHECK ((`quantity` in (2,4)))
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Transaction`;
CREATE TABLE `Transaction` (
  `transactionID` int NOT NULL AUTO_INCREMENT,
  `customerID` int DEFAULT NULL,
  `payment_method` varchar(50) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `feedback` varchar(500) DEFAULT NULL,
  `totalPrice` float DEFAULT NULL,
  PRIMARY KEY (`transactionID`),
  KEY `customerID` (`customerID`),
  CONSTRAINT `Transaction_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `Customer` (`customerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Transaction_chk_1` CHECK ((`Payment_method` in (_utf8mb4'Cash',_utf8mb4'Card',_utf8mb4'Online'))),
  CONSTRAINT `Transaction_chk_2` CHECK ((`totalPrice` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Account` (`userID`, `email`, `password`, `roleID`) VALUES
(1, 'admin1@example.com', 'admin1password', 2);
INSERT INTO `Account` (`userID`, `email`, `password`, `roleID`) VALUES
(2, 'admin2@example.com', 'admin2password', 2);
INSERT INTO `Account` (`userID`, `email`, `password`, `roleID`) VALUES
(3, 'table1@example.com', 'table1password', 1);
INSERT INTO `Account` (`userID`, `email`, `password`, `roleID`) VALUES
(4, 'table2@example.com', 'table2password', 1),
(5, 'table3@example.com', 'table3password', 1),
(6, 'table4@example.com', 'table4password', 1),
(7, 'table5@example.com', 'table5password', 1),
(8, 'table6@example.com', 'table6password', 1),
(9, 'table7@example.com', 'table7password', 1),
(10, 'table8@example.com', 'table8password', 1),
(11, 'table9@example.com', 'table9password', 1),
(12, 'table10@example.com', 'table10password', 1),
(13, 'alicebrown@example.com', '$2b$10$dXvEnYNeULdc2XL2OT8b8O68CeLCRrBcZsSACY8iqP024HfFYcEne', 1);

INSERT INTO `Admin` (`AdminID`, `userID`, `adminName`) VALUES
(1, 1, 'SYNDRA');
INSERT INTO `Admin` (`AdminID`, `userID`, `adminName`) VALUES
(2, 2, 'GAREN');


INSERT INTO `Choose` (`chooseID`, `customerID`, `itemID`, `note`, `price`, `quantity`, `status`, `deleted`) VALUES
(1, 12, 1, 'No onions', 60, 3, 'process', 0);
INSERT INTO `Choose` (`chooseID`, `customerID`, `itemID`, `note`, `price`, `quantity`, `status`, `deleted`) VALUES
(2, 12, 3, 'Extra cheese', 120, 4, 'served', 0);
INSERT INTO `Choose` (`chooseID`, `customerID`, `itemID`, `note`, `price`, `quantity`, `status`, `deleted`) VALUES
(3, 12, 1, 'Extra spicy', 40, 2, 'order', 0);
INSERT INTO `Choose` (`chooseID`, `customerID`, `itemID`, `note`, `price`, `quantity`, `status`, `deleted`) VALUES
(4, 12, 3, 'No sauce', 30, 1, 'order', 0),
(5, 12, 1, 'Extra spicy', 40, 2, 'served', 0),
(6, 12, 3, 'No sauce', 30, 1, 'served', 0),
(7, 12, 1, 'Extra spicy', 20, 1, 'served', 0),
(8, 12, 3, 'No sauce', 90, 3, 'served', 0);

INSERT INTO `Customer` (`customerID`, `tableID`, `customerName`, `phone`, `age`) VALUES
(1, 1, 'John Doe', '1234567890', 25);
INSERT INTO `Customer` (`customerID`, `tableID`, `customerName`, `phone`, `age`) VALUES
(2, 2, 'Jane Smith', '9876543210', 30);
INSERT INTO `Customer` (`customerID`, `tableID`, `customerName`, `phone`, `age`) VALUES
(3, 3, 'Michael Brown', '5678901234', 40);
INSERT INTO `Customer` (`customerID`, `tableID`, `customerName`, `phone`, `age`) VALUES
(4, 4, 'Emily Johnson', '4567890123', 35),
(5, 5, 'Chris Davis', '2345678901', 22),
(6, 6, 'Anna Garcia', '8765432109', 28),
(7, 7, 'David Wilson', '3456789012', 50),
(8, 8, 'Laura Martinez', '7654321098', 18),
(9, 9, 'Daniel Anderson', '6543210987', 27),
(10, 10, 'Sophia Taylor', '5432109876', 33),
(11, 11, 'Nhon', '09090902102', 21),
(12, 11, 'Nhon', '09090902102', 21);

INSERT INTO `Menu_Item` (`itemID`, `itemName`, `type_of_food`, `price`, `descriptions`, `preparation_time`, `status`) VALUES
(1, 'Edamame', 'Appetizers', 20, 'Steamed young soybeans lightly salted, perfect as a light snack to start your meal.', 10, 1);
INSERT INTO `Menu_Item` (`itemID`, `itemName`, `type_of_food`, `price`, `descriptions`, `preparation_time`, `status`) VALUES
(2, 'Seaweed Salad', 'Appetizers', 25, 'A refreshing mix of various seaweeds, sesame seeds, and a tangy vinaigrette dressing.', 2, 1);
INSERT INTO `Menu_Item` (`itemID`, `itemName`, `type_of_food`, `price`, `descriptions`, `preparation_time`, `status`) VALUES
(3, 'Gyoza', 'Appetizers', 30, 'Japanese dumplings filled with ground pork and vegetables.', 8, 1);
INSERT INTO `Menu_Item` (`itemID`, `itemName`, `type_of_food`, `price`, `descriptions`, `preparation_time`, `status`) VALUES
(4, 'Chawanmushi', 'Appetizers', 27, 'A savory steamed egg custard with shiitake mushrooms, shrimp, and ginkgo nuts, served in a small cup.', 10, 1),
(5, 'Sushi & Sashimi Platter', 'Main Dishes', 50, 'A selection of fresh sushi rolls and sashimi slices, featuring tuna, salmon, yellowtail, and more.', 10, 1),
(6, 'Teriyaki Chicken', 'Main Dishes', 50, 'Grilled chicken glazed with a sweet savory teriyaki sauce, served with rice and steamed vegetables.', 15, 1),
(7, 'Unagi Don', 'Main Dishes', 44, 'Grilled eel glazed with a sweet soy-based sauce, served on a bed of steamed white rice.', 5, 1),
(8, 'Katsu Curry', 'Main Dishes', 63, 'Breaded and deep-fried pork or chicken cutlet served with a rich, flavorful Japanese curry sauce.', 10, 1),
(9, 'Tempura', 'Light Meals', 22, 'Lightly battered and deep-fried vegetables and shrimp served with dipping sauce.', 10, 1),
(10, 'Okonomiyaki', 'Light Meals', 42, 'A savory pancake made with cabbage, meat (usually pork or seafood), and topped with okonomiyaki sauce, bonito flakes, and a drizzle of mayonnaise.', 15, 1),
(11, 'Takoyaki', 'Light Meals', 15, 'Ball-shaped dough filled with diced octopus, tempura bits.', 5, 1),
(12, 'Onigiri', 'Light Meals', 30, 'Japanese rice balls filled with various fillings like umeboshi (pickled plum), wrapped in nori.', 10, 1),
(13, 'Sake', 'Drinks', 7, 'A traditional Japanese rice wine.', 1, 1),
(14, 'Japanese Beer', 'Drinks', 55, 'Popular brands like Asahi, Sapporo, and Kirin are served cold.', 2, 1),
(15, 'Matcha Latte', 'Drinks', 5, 'A creamy and slightly bitter drink made with powdered green tea (matcha) and steamed milk.', 5, 1),
(16, 'Houjicha', 'Drinks', 5, 'A roasted green tea that has a warm, toasty flavor and a low caffeine content. It\'s served hot.', 7, 1),
(17, 'Matcha Cheesecake', 'Desserts', 15, 'A rich and creamy cheesecake infused with matcha, offering a perfect balance of sweetness and bitterness.', 5, 1),
(18, 'Dorayaki', 'Desserts', 5, 'Soft pancakes filled with sweet red bean paste, a popular Japanese snack.', 10, 1),
(19, 'Anmitsu', 'Desserts', 5, 'A traditional dessert made with agar jelly, red bean paste, fruits, and a sweet syrup.', 5, 1),
(20, 'Yuzu Sorbet', 'Desserts', 5, 'A refreshing citrus sorbet made from the aromatic yuzu fruit, perfect for cleansing the palate.', 7, 1);

INSERT INTO `Order` (`orderID`, `transactionID`, `chooseID`) VALUES
(1, 2, 1);
INSERT INTO `Order` (`orderID`, `transactionID`, `chooseID`) VALUES
(2, 2, 2);
INSERT INTO `Order` (`orderID`, `transactionID`, `chooseID`) VALUES
(3, 3, 1);
INSERT INTO `Order` (`orderID`, `transactionID`, `chooseID`) VALUES
(4, 3, 2),
(5, 4, 1),
(6, 4, 2),
(7, 5, 1),
(8, 5, 2),
(9, 6, 1),
(10, 6, 2),
(11, 7, 1),
(12, 7, 2),
(13, 8, 1),
(14, 8, 2),
(15, 9, 1),
(16, 9, 2),
(17, 10, 1),
(18, 10, 2),
(19, 11, 1),
(20, 11, 2),
(21, 11, 5),
(22, 11, 6),
(23, 11, 7),
(24, 11, 8);

INSERT INTO `Role` (`roleID`, `roleName`) VALUES
(1, 'Table');
INSERT INTO `Role` (`roleID`, `roleName`) VALUES
(2, 'Admin');


INSERT INTO `TableEntity` (`tableID`, `userID`, `tableName`, `quantity`, `status`) VALUES
(1, 3, 'Table A', 2, 1);
INSERT INTO `TableEntity` (`tableID`, `userID`, `tableName`, `quantity`, `status`) VALUES
(2, 4, 'Table B', 4, 1);
INSERT INTO `TableEntity` (`tableID`, `userID`, `tableName`, `quantity`, `status`) VALUES
(3, 5, 'Table C', 2, 1);
INSERT INTO `TableEntity` (`tableID`, `userID`, `tableName`, `quantity`, `status`) VALUES
(4, 6, 'Table D', 4, 1),
(5, 7, 'Table E', 2, 1),
(6, 8, 'Table F', 4, 1),
(7, 9, 'Table G', 2, 1),
(8, 10, 'Table H', 4, 1),
(9, 11, 'Table I', 2, 1),
(10, 12, 'Table J', 4, 1),
(11, 13, 'Alice Brown', 2, 0);

INSERT INTO `Transaction` (`transactionID`, `customerID`, `payment_method`, `date`, `feedback`, `totalPrice`) VALUES
(1, 12, 'Card', '2024-11-27 12:12:30', 'Great service!', 180);
INSERT INTO `Transaction` (`transactionID`, `customerID`, `payment_method`, `date`, `feedback`, `totalPrice`) VALUES
(2, 12, 'Card', '2024-11-27 12:14:40', 'Great service!', 180);
INSERT INTO `Transaction` (`transactionID`, `customerID`, `payment_method`, `date`, `feedback`, `totalPrice`) VALUES
(3, 12, 'Card', '2024-11-27 12:15:59', 'Great service!', 180);
INSERT INTO `Transaction` (`transactionID`, `customerID`, `payment_method`, `date`, `feedback`, `totalPrice`) VALUES
(4, 12, 'Card', '2024-11-27 12:20:52', 'Great service!', 180),
(5, 12, 'Card', '2024-11-27 12:21:33', 'Great service!', 180),
(6, 12, 'Card', '2024-11-27 12:22:16', 'Great service!', 180),
(7, 12, 'Card', '2024-11-27 12:30:28', 'Great service!', 180),
(8, 12, 'Card', '2024-11-27 12:31:42', 'Great service!', 180),
(9, 12, 'Card', '2024-11-27 12:33:47', 'Great service11111!', 180),
(10, 12, 'Card', '2024-11-27 12:43:54', 'Great service11111!', 180),
(11, 12, 'Card', '2024-11-29 09:26:23', 'Great service11115!', 360);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;