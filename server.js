const inquirer = require('inquirer');
const db = require('./db/connection');
const mysql = require('mysql2');

//required routes, since i modularized the code
const { departmentQuestions, insertDept, showAllDepts } = require('./routes/deptRoutes');
const { roleQuestions, insertRole, showRoles } = require('./routes/roleRoutes');
const { employeeQuestions, insertEmployee, showAllEmployees, chooseUpdate } = require('./routes/employeeRoutes');

const PORT = process.env.PORT || 3001;

//database connection
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

//initial function to start the process--when the question array is called, the user is given multiple choices to select. for adding to each table (department, role, employee), the user is prompted with table-specific questions from their own arrays (see routes folder). upon answering, the responses are inserted into the chosen table, and it is displayed in the console. if the user chooses to view any of these departments, a select query is called to show these tables in the console. 
function startPrompt() {
  inquirer.prompt(questions)
  .then(({ choices }) => {
    if (choices === 'add department') {
    inquirer.prompt(departmentQuestions)
    .then((req, res) => {
        return insertDept(req, res);
    })
    } else if (choices === 'view all departments') {
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