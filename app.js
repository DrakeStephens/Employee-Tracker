const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employees',
    password: '123456'
  });

function promptUser() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'What will you be doing today?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        },
    ]).then(answer => {
            if (answer.prompt === 'view all departments'){
                connection.query(
                    'SELECT * FROM `departments`',
                    function(err, results, fields) {
                      console.table(results); 
                    }
                  );
            }
            else if (answer.prompt === 'view all roles') {
                connection.query(
                    'SELECT roles.*, departments.name AS department_name FROM roles LEFT JOIN departments ON roles.department_id=departments.id',
                    function(err, results, fields) {
                      console.table(results); 
                    }
                  );
            }
            else if (answer.prompt === 'view all employees') {
                connection.query(
                    'SELECT employees.id id, roles.salary, roles.department_id department_name, employees.first_name firstName, employees.last_name lastName, roles.title, CONCAT(employees2.first_name, " ", employees2.last_name) manager FROM employees LEFT JOIN employees employees2 ON employees.manager_id = employees2.id LEFT JOIN roles ON employees.role_id = roles.id;',                    
                    function(err, results, fields) {
                      console.table(results); 
                    }
                  );
            }
            else if (answer.prompt === 'add a department'){
                return inquirer.prompt([
                    {
                        type: 'input',
                        name: 'department',
                        message: 'What is your departments name? (Required)'
                    }
                ]).then(answer =>{
                    connection.query(
                        'INSERT INTO departments (name) VALUES (?)',
                        [answer.department],
                        function(err, results, fields) {
                          console.table(results);
                          console.log(err) 
                        }
                      );
                })
            }
            else if (answer.prompt === 'add a role'){
                return inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'What is your new roles name? (Required)'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is your new roles salary? (Required)'
                    },
                    {
                        type: 'input',
                        name: 'department',
                        message: 'What is your new roles department? (Required)'
                    }
                ]).then(answer =>{
                    connection.query(
                        'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)',
                        [answer.title, answer.salary, answer.department],
                        function(err, results, fields) {
                          console.table(results);
                          console.log(err) 
                        }
                      );
                })
            }
            else if (answer.prompt === 'add an employee'){
                return inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstname',
                        message: 'What is your new employees first name? (Required)'
                    },
                    {
                        type: 'input',
                        name: 'lastname',
                        message: 'What is your new employees last name? (Required)'
                    },
                    {
                        type: 'input',
                        name: 'role',
                        message: 'What is your new employees role? (Required)'
                    },
                    {
                        type: 'input',
                        name: 'manager',
                        message: 'Who is your new employees manager? (Required)'
                    }
                ]).then(answer =>{
                    connection.query(
                        'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
                        [answer.firstname, answer.lastname, answer.role, answer.manager],
                        function(err, results, fields) {
                          console.table(results);
                          console.log(err) 
                        }
                      );
                })
            }
            else if (answer.prompt === 'update an employee role'){
                return inquirer.prompt([
                    {
                        type: 'input',
                        name: 'employee',
                        message: 'Which employee would you lik to update? (Required)'
                    },
                    {
                        type: 'input',
                        name: 'role',
                        message: 'What is your employees new role? (Required)'
                    },
                ]).then(answer =>{
                    var employee = parseInt(answer.employee)
                    var role = parseInt(answer.role)
                    connection.query(
                        'UPDATE employees SET role_id = ? WHERE id = ?',
                        [role, employee],
                        function(err, results, fields) {
                          console.table(results);
                          console.log(err) 
                        }
                      );
                })
            }
        })
};

promptUser();