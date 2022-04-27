const db = require('../db/connection');

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

function insertRole(req) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [req.title, req.salary, req.department_id];
    db.query(sql, params, (err, res) => {
        if (err) {
            throw err;
        }
    })
    console.log('role added successfully.');
    return showRoles();
}

function showRoles(req, res) {
    const sql = `SELECT role.*, department.name
    AS dept_name
    FROM role
    LEFT JOIN department
    ON role.department_id = department.id`
        db.query(sql, (err, res) => {
            if (err) {
                throw err;
            }
            console.table(res);
        })
    }

module.exports = { roleQuestions, insertRole, showRoles };