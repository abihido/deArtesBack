-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema escuela
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema escuela
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `escuela` DEFAULT CHARACTER SET utf8 ;
USE `escuela` ;

-- -----------------------------------------------------
-- Table `escuela`.`estudiantes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `escuela`.`estudiantes` (
  `idEstudiantes` INT NOT NULL AUTO_INCREMENT,
  `mail` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(65) NOT NULL,
  PRIMARY KEY (`idEstudiantes`),
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  UNIQUE INDEX `password_UNIQUE` (`password` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `escuela`.`padres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `escuela`.`padres` (
  `idPadres` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `mail` VARCHAR(45) NOT NULL,
  `password` VARCHAR(65) NOT NULL,
  `idEstudiante` INT NOT NULL,
  PRIMARY KEY (`idPadres`),
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `Representado_idx` (`idEstudiante` ASC) VISIBLE,
  CONSTRAINT `Representado`
    FOREIGN KEY (`idEstudiante`)
    REFERENCES `escuela`.`estudiantes` (`idEstudiantes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `escuela`.`maestros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `escuela`.`maestros` (
  `idMaestros` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `mail` VARCHAR(45) NOT NULL,
  `password` VARCHAR(65) NOT NULL,
  PRIMARY KEY (`idMaestros`),
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `escuela`.`curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `escuela`.`curso` (
  `idCurso` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `semestre` VARCHAR(45) NOT NULL,
  `active` TINYINT NOT NULL,
  `master` INT NOT NULL,
  PRIMARY KEY (`idCurso`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `Maestro_idx` (`master` ASC) VISIBLE,
  CONSTRAINT `Maestro`
    FOREIGN KEY (`master`)
    REFERENCES `escuela`.`maestros` (`idMaestros`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `escuela`.`matriculas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `escuela`.`matriculas` (
  `idMatriculas` INT NOT NULL AUTO_INCREMENT,
  `idEstudiante` INT NOT NULL,
  `idCurso` INT NOT NULL,
  `semestre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idMatriculas`),
  INDEX `estudiante_idx` (`idEstudiante` ASC) VISIBLE,
  INDEX `curso_idx` (`idCurso` ASC) VISIBLE,
  CONSTRAINT `estudiante`
    FOREIGN KEY (`idEstudiante`)
    REFERENCES `escuela`.`estudiantes` (`idEstudiantes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `curso`
    FOREIGN KEY (`idCurso`)
    REFERENCES `escuela`.`curso` (`idCurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `escuela` ;

-- -----------------------------------------------------
-- Placeholder table for view `escuela`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `escuela`.`usuarios` (`id` INT);

-- -----------------------------------------------------
-- View `escuela`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `escuela`.`usuarios`;
USE `escuela`;
CREATE  OR REPLACE VIEW `usuarios` AS (select idEstudiantes as id ,name,mail,password,"est" as rol from estudiantes union select idPadres as id ,name,mail,password,"pad" as rol from padres union select idMaestros as id ,name,mail,password,"mat" as rol from maestros);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
