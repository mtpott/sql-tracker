const db = require('../db/connection');

//questions to gather user information when adding a new department
const departmentQuestions =[
    {
        type: 'input',
        name: 'name',
        message: 'what is the name of the department?'
    }
];

//db query to insert a new department into the table. since it's the parent table, nothing is being joined to it, but department.name ends up in the role table.
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

//db query to show the entire department table
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