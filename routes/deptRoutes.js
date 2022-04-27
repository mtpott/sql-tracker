const db = require('../db/connection');

const departmentQuestions =[
    {
        type: 'input',
        name: 'name',
        message: 'what is the name of the department?'
    }
];

function insertDept(req, res) {
    const sql = `INSERT INTO department (name) VALUE (?)`;
    const params = req.name;

    db.query(sql, params, (err, res) => {
        if (err) {
            throw err;
        }
        console.log('department added successfully.');
        return showAllDepts();
    })
}

function showAllDepts(req, res) {
    const sql =`SELECT * FROM department`;
    db.query(sql, (err, res) => {
        if (err) {
            throw err;
        }
        console.table(res);
    })
}


module.exports = { departmentQuestions, insertDept, showAllDepts };