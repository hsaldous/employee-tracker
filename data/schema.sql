DROP DATABASE IF EXISTS employee_cms_db;

CREATE DATABASE employee_cms_db;

USE employee_cms_db;


CREATE TABLE employee (
  id int AUTO_INCREMENT NOT NULL,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  manager_id int,
  role_id int NOT NULL,
  PRIMARY KEY(id)
);


CREATE TABLE role (
  id int AUTO_INCREMENT NOT NULL,
  title varchar(30) NOT NULL,
  salary varchar(30) NOT NULL,
  department_id int NOT NULL,
  PRIMARY KEY(id)
);


CREATE TABLE department (
  id int AUTO_INCREMENT NOT NULL,
  name varchar(30) NOT NULL,
  PRIMARY KEY(id)
);