DROP DATABASE IF EXISTS  employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id Int AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE roles (
  id Int AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
)

CREATE TABLE employee (
  id Int AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
  manager_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
)



