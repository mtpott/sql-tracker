// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

const inquirer = require('inquirer');
const db = require('./db/connection');
const mysql = require('mysql2');


const PORT = process.env.PORT || 3001;

db.connect(err => {
    if(err) throw err;
    console.log(`database connected at PORT ${PORT}.`);
    startPrompt();
})

const questions = [
    {
        type: 'list',
        name: 'choices',
        message: 'what would you like to do?',
        choices: [ 'view all departments', 'view all roles', 'view all employees', 'add department', 'add role', 'add employee']
    }
]

const departmentQuestions =[
    {
        type: 'input',
        name: 'name',
        message: 'what is the name of the department?'
    }
];

const roleQuestions =[
    {
        type: 'input',
        name: 'title',
        message: 'what is the name of the role?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'what is the salary for this role?'
    },
    {
        type: 'input',
        name: 'department_id',
        message: 'under which department does this role belong?'
    }
];

const employeeQuestions = [
    {
        type: 'input',
        name: 'first_name',
        message: 'what is their first name?'
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'what is their last name?'
    },
    {
        type: 'input',
        name: 'role_id',
        message: 'what is their role?'
    },
    {
        type: 'input',
        name: 'manager_id',
        message: 'who is their supervisor?'
    }
]

// for add department `INSERT INTO department (name) VALUE (?)`

function startPrompt() {
    inquirer.prompt(questions)
        .then(({ choices }) => {
        if (choices === 'add department') {
            inquirer.prompt(departmentQuestions)
        .then(function(req, res) {
            const sql = `INSERT INTO department (name) VALUE (?)`;
            const params = req.name;
            db.query(sql, params, (err, res) => {
                if (err) {
                    throw err;
                }
                console.log('department added successfully.');
            })
        }
        )} else if (choices === 'view all departments') {
            db.query(`SELECT * FROM department`, function(err, res) {
                if (err) throw err;
                console.table(res);
                })
        } else if (choices === 'add role') {
        inquirer.prompt(roleQuestions)
        .then(function (req, body) {
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            const params = [req.title, req.salary, req.department_id];
            db.query(sql, params, (err, res) => {
                if (err) {
                    throw err;
                }
            })
            console.log('role added successfully.');
            })
        } else if (choices === 'view all roles') {
            db.query(`SELECT * FROM role`, function(err, res) {
                console.table(res);
                })
        } else if (choices === 'add employee') {
            inquirer.prompt(employeeQuestions)
            .then(function (req, body) {
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                const params = [req.first_name, req.last_name, req.role_id, req.manager_id]
                db.query(sql, params, (err, res) => {
                    if (err) {
                        throw err;
                    }
                })
                console.log('employee added successfully.')
            })
        } else if (choices === 'view all employees') {
            db.query(`SELECT * FROM employee`, function(err, res) {
                    console.table(res);
                })
            }  
        })
    }
//startPrompt();