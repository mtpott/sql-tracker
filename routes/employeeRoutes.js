const db = require('../db/connection');
const inquirer = require('inquirer');

//questions to gather user information when adding a new employee
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

//db query called to display the employee table. includes a concat statement to show the employee's role title
function showAllEmployees() {
    const sql = `SELECT employee.*, role.title
        AS role_name
        FROM employee
        LEFT JOIN role
        ON employee.role_id = role.id`;
        db.query(sql, (err, res) => {
            if (err) {
                throw err;
            }
            console.table(res);
        })
    }

//db query called to insert a new employee into the table
function insertEmployee(req) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [req.first_name, req.last_name, req.role_id, req.manager_id]
    db.query(sql, params, (err, res) => {
        if (err) {
            throw err;
        }
    })
    console.log('employee added successfully.');
    return showAllEmployees();
}

//functionality for updating the selected employee's role
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

module.exports = { employeeQuestions, insertEmployee, showAllEmployees, chooseUpdate };