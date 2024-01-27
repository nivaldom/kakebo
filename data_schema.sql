CREATE DATABASE `kakebo_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

CREATE TABLE `kakebo_db`.`source` (
  `id_source` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NULL,
  `type` VARCHAR(64) NULL,
  `bank` VARCHAR(64) NULL,
  `currency` VARCHAR(3) NULL,
  `amount` DECIMAL(14,2) NULL,
  PRIMARY KEY (`id_source`));


INSERT INTO `kakebo_db`.`source` (`name`, `type`, `currency`, `amount`) VALUES ('Billetera Física', 'Efectivo', 'PEN', '285');


INSERT INTO `kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-11', CURRENT_TIMESTAMP(), 'Uñas Sammy', '99', '1', '65', 'PEN', '1');

INSERT INTO `kakebo_db`.`subcategory` (`id_subcategory`, `id_category`, `name`) VALUES ('1', '1', 'Insumos Alimentarios');
INSERT INTO `kakebo_db`.`subcategory` (`id_subcategory`, `id_category`, `name`) VALUES ('2', '1', 'Restaurantes y Bares');
INSERT INTO `kakebo_db`.`subcategory` (`id_subcategory`, `id_category`, `name`) VALUES ('3', '1', 'Snacks y Antojos');
INSERT INTO `kakebo_db`.`subcategory` (`id_subcategory`, `id_category`, `name`) VALUES ('1', '2', 'Transporte Público');


SELECT
so.id_source,so.name,so.type,so.bank,so.currency,so.amount AS original_amount,IFNULL(SUM(ex.amount),0) AS expended_amount,(so.amount-IFNULL(SUM(ex.amount),0)) AS amount  
FROM
source so
LEFT JOIN
expenses ex ON so.id_source = ex.id_source
GROUP BY so.id_source;


INSERT INTO `kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-13', CURRENT_TIMESTAMP(), 'Desayuno Simon', '2', '2', '36', 'PEN', '1');
INSERT INTO `kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-13', CURRENT_TIMESTAMP(), 'Taxi Casa Claudia', '3', '2', '21', 'PEN', '2');
INSERT INTO `kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-13', CURRENT_TIMESTAMP(), 'Panes con Chorizo', '2', '3', '18.32', 'PEN', '2');
INSERT INTO `kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-13', CURRENT_TIMESTAMP(), 'Sombrillas', '4', '1', '10', 'PEN', '2');
INSERT INTO `kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-13', CURRENT_TIMESTAMP(), 'Gasolina', '4', '1', '15', 'PEN', '2');
INSERT INTO `kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-13', CURRENT_TIMESTAMP(), 'Cena 8.10', '2', '2', '21', 'PEN', '2');
INSERT INTO `kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-13', CURRENT_TIMESTAMP(), 'Cena Gaseosa', '2', '2', '6', 'PEN', '1');
INSERT INTO `kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-13', CURRENT_TIMESTAMP(), 'Desayuno Mercado', '2', '2', '20', 'PEN', '2');
INSERT INTO `bichitod_kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-16', CURRENT_TIMESTAMP(), 'Pasajes Trabajo', '3', '1', '2', 'PEN', '1');
INSERT INTO `bichitod_kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-16', CURRENT_TIMESTAMP(), 'Almuerzo NewRest', '2', '2', '10', 'PEN', '2');
INSERT INTO `bichitod_kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-16', CURRENT_TIMESTAMP(), 'Recarga Sammy', '1', '1', '5', 'PEN', '2');
INSERT INTO `bichitod_kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-16', CURRENT_TIMESTAMP(), 'Pasajes Casa', '3', '1', '2', 'PEN', '1');
INSERT INTO `bichitod_kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-16', CURRENT_TIMESTAMP(), 'Cena Sarcletti', '2', '2', '48', 'PEN', '2');
INSERT INTO `bichitod_kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-16', CURRENT_TIMESTAMP(), 'Mototaxi Casa', '3', '2', '3', 'PEN', '1');
INSERT INTO `bichitod_kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-17', CURRENT_TIMESTAMP(), 'Taxi Casa Sammy', '3', '2', '23.5', 'PEN', '2');
INSERT INTO `bichitod_kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-17', CURRENT_TIMESTAMP(), 'Recarga Sammy', '1', '1', '15', 'PEN', '2');

INSERT INTO `bichitod_kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-13', CURRENT_TIMESTAMP(), 'Crunchyroll', '8', '2', '19', 'PEN', '2');
INSERT INTO `bichitod_kakebo_db`.`expenses` (`date`, `datehour`, `concept`, `id_category`, `id_subcategory`, `amount`, `currency`, `id_source`) VALUES ('2024-01-19', CURRENT_TIMESTAMP(), 'Regalo Papá', '5', '2', '78', 'PEN', '2');