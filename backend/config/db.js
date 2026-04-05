const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Abhinav@9743",
  database: "teacher_portal",
});

module.exports = db;