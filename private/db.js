const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Swisher1993!!",
  database: "employee_cms_db"
});

module.exports = {connection}