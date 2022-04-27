const db = require('../db/connection');
const inquirer = require('inquirer');

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

module.exports = { employeeQuestions, insertEmployee, showAllEmployees };