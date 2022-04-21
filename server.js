// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

const fs = require('fs');
const inquirer = require('inquirer');

const questions = [
    {
        type: 'list',
        name: 'choices',
        message: 'what would you like to add?',
        choices: ['department', 'role', 'employee']
    }
]

const departmentQuestions =[
    {
        type: 'input',
        name: 'departmentName',
        message: 'what is the name of the department?'
    },
    {
        type: 'list',
        name: 'next',
        message: 'what would you like to do next?',
        choices: ['see employee database', 'add new query']
    }
];

const roleQuestions =[
    {
        type: 'input',
        name: 'roleName',
        message: 'what is the name of the role?'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'what is the salary for this role?'
    },
    {
        type: 'input',
        name: 'roleDepartment',
        message: 'under which department does this role belong?'
    }
];

const employeeQuestions = [
    {
        type: 'input',
        name: 'employeeFirstName',
        message: 'what is their first name?'
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: 'what is their last name?'
    },
    {
        type: 'input',
        name: 'employeeRole',
        message: 'what is their role?'
    },
    {
        type: 'input',
        name: 'supervisor',
        message: 'who is their supervisor?'
    }
]

function startPrompt() {
    inquirer.prompt(questions)
        .then(({ choices }) => {
            if (choices === 'department') {
                inquirer.prompt(departmentQuestions)
            .then(({ next, departmentName }) => {
                console.log(departmentName);
                if (next === 'add new query') {
                    return startPrompt();
                } else if (next === 'see employee database') {
                    console.log('this is the employee database!');
                }
            })
        } else if (choices === 'role') {
            inquirer.prompt(roleQuestions)
            // .then(function ({ roleName, roleSalary, roleDepartment }) {
            //     pushRoles(roleName, roleSalary, roleDepartment)
            // })
            .then(({ roleName, roleSalary, roleDepartment }) => {
                console.log('roleName: ' + roleName);
                console.log('roleSalary: ' + roleSalary);
                console.log('roleDepartment: ' + roleDepartment);
                return startPrompt();
            })
        } else if (choices === 'employee') {
            inquirer.prompt(employeeQuestions)
            .then(({ employeeFirstName, employeeLastName, employeeRole, supervisor}) => {
                console.log('employeeFirstName: ' + employeeFirstName);
                console.log('employeeLastName: ' + employeeLastName);
                console.log('employeeRole: ' + employeeRole);
                console.log('supervisor: ' + supervisor);
            })
        }
    })
}

startPrompt();