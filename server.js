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

// this function is basically useless but i was really proud of it so i commented it out and left it in. this function concatenates all employee first and last names and pushes that to an array. i wanted to use it to scroll through to update (for user functionality) but i fought with it for a long time and couldn't get the update statement to work the way i wanted to

// function chooseEmployee() {
//     const employee = [];
//     const sql = `SELECT CONCAT (e2.first_name, ' ', e2.last_name) AS employee
//     FROM employee e
//     JOIN employee e2
//     ON e.id = e2.id`;
//     db.query(sql, (err, res) => {
//         for (let i = 0; i < res.length; i++) {
//             employee.push(res[i].employee)
//         }
//         if (err) throw err;
//         chooseUpdate(employee);
//     })
// }

function chooseUpdate() {
    inquirer.prompt(
    {
        type: 'input',
        name: 'update',
        message: 'which employee would you like to update? enter the correct id number from the employee table to continue.'
    })
    .then(({ update }) => {
        roleChange(update);
    })
}

function roleChange(update) {
    inquirer.prompt
    ({
        type: 'input',
        name: 'roleUpdate',
        message: 'which role would you like to update? enter the id number from the role table to continue.'
    })  
    .then(({roleUpdate}) => {
        const sql = `UPDATE employee
        SET role_id = ${roleUpdate}
        WHERE employee.id = ${update}`;
        const params = [roleUpdate];
        db.query(sql, params, (err, res) => {
            if (err) throw err;
            return showAllEmployees(res);
        })
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
        } else if (choices === 'view all employees') {
            return showAllEmployees();
        } else if (choices === 'update employee') {
        chooseUpdate();
        }
    })
}