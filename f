SELECT roles.*, departments.name AS department_name FROM roles LEFT JOIN departments ON roles.department_id=departments.id 

`SELECT candidates.*, parties.name 
AS party_name 
FROM candidates 
LEFT JOIN parties 
ON candidates.party_id = parties.id`;

SELECT employees.* roles.title, employees.manager_id, departments.name FROM employees INNER JOIN employees ON employees.role_id=roles.id INNER JOIN employees ON employees.manager_id=employees.first_name

CREATE TABLE roles (
  id INTEGER PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary INTEGER NOT NULL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER REFERENCES employees(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

UPDATE employees SET role_title = ?, WHERE role_id = ?;