use employee_cms_db;

INSERT INTO department 
    (name)
VALUES 
  ("Sales"),
  ("Engineering"),
  ("Finance"),
  ("Legal");

INSERT INTO role 
    (title, salary, department_id)
VALUES 
  ("Sales Lead", 100000, 1),
  ("Salesperson", 80000, 1),
  ("Lead Engineer", 150000, 2),
  ("Software Engineer", 120000, 2),
  ("Accountant", 125000, 3),
  ("Legal Team Lead Attorney", 250000, 4),
  ("Lawyer", 190000, 4);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES 
  ("John", "Hamm", 1, NULL),
  ("Chandler", "Bing", 2, 1),
  ("Ross", "Geller", 3, NULL),
  ("Rachel", "Green", 4, 3),
  ("Joey", "Tribioni", 5, NULL),
  ("Bruce", "Wayne", 6, 5),
  ("Lisa", "Kudrow", 7, NULL);