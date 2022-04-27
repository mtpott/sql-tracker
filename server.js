// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

const inquirer = require('inquirer');
const db = require('./db/connection');
const mysql = require('mysql2');

const { departmentQuestions, insertDept, showAllDepts } = require('./routes/deptRoutes');
const { roleQuestions, insertRole, showRoles } = require('./routes/roleRoutes');
const { employeeQuestions, insertEmployee, showAllEmployees } = require('./routes/employeeRoutes');

const PORT = process.env.PORT || 3001;

db.connect(err => {
    if(err) throw err;
    console.log(`database connected at PORT ${PORT} :)`);
    startPrompt();
})

const questions = [
    {
        type: 'list',
        name: 'choices',
        message: 'what would you like to do?',
        choices: [ 'view all departments', 'view all roles', 'view all employees', 'add department', 'add role', 'add employee', 'update employee']
    }
]

function chooseEmployee() {
    const employee = [];
    const sql = `SELECT CONCAT (e2.first_name, ' ', e2.last_name) AS employee
    FROM employee e
    JOIN employee e2
    ON e.id = e2.id`;
    db.query(sql, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            employee.push(res[i].employee)
        }
        if (err) throw err;
        chooseUpdate(employee);
    })
}

function chooseUpdate(employee) {
    inquirer.prompt(
        {
            type: 'list',
            name: 'update',
            message: 'which employee would you like to update?',
            choices: employee
        })
    .then(({ update }) => {
            console.log(update);
            chooseRole(update);
        }
    )
}

function roleUpdate(role) {
    inquirer.prompt
    ({
        type: 'list',
        name: 'roleUpdate',
        message: 'which role would you like to update?',
        choices: role
    })
    .then(({roleUpdate}) => {
        //UPDATE statement for sql database
        console.log(roleUpdate);
        //chooseRole();
    })
}

function chooseRole(update, i) {
    const role = [];
    //console.log('i chose to update', update);
    const sql = `SELECT title FROM role`;
    db.query(sql, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            role.push(res[i].title)
        }
        if (err) throw err;
        console.log(role);
        roleUpdate(role);
    })
}

function startPrompt() {
    inquirer.prompt(questions)
        .then(({ choices }) => {
        if (choices === 'add department') {
        inquirer.prompt(departmentQuestions)
        .then((req, res) => {
            return insertDept(req, res);
        }
        )} else if (choices === 'view all departments') {
            return showAllDepts();
        } else if (choices === 'add role') {
        inquirer.prompt(roleQuestions)
        .then((req, body) => {
            return insertRole(req);
            })
        } else if (choices === 'view all roles') {
            return showRoles();
        } else if (choices === 'add employee') {
            inquirer.prompt(employeeQuestions)
            .then((req, body) => {
                return insertEmployee(req);
            })
            .then(function (req, body) {
                
            })
            //return startPrompt();
        } else if (choices === 'view all employees') {
            return showAllEmployees();
        } else if (choices === 'update employee') {
        chooseEmployee();
        }
    })
}