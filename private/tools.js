const db = require("./db");
const inquirer = require("inquirer");

function viewAllEmployees() { 
  db.connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    console.table(res);
    cmsMain();
  });
};


function viewAllDepartments() {
  db.connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    console.table(res);
    cmsMain();
  });
};


function viewAllRoles() {
  db.connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    console.table(res);
    cmsMain();
  });
};


function viewDepartmentBudget() { 
  db.connection.query("SELECT name AS Department,SUM(salary) AS 'Salary Cost' FROM role r INNER JOIN department d ON d.id = r.department_id GROUP BY d.name", function(err, res) {
    if (err) throw err;
    console.table(res);
    cmsMain();
  });
};


function viewEmployeeByManager() { 
  db.connection.query("SELECT * FROM employee GROUP BY manager_id", function(err, res) {
    if (err) throw err;
    console.table(res);
    cmsMain();
  });
};


function addNewEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the first name of the new employee?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the last name of the new employee?",
    },
    {
      type: "input",
      name: "role",
      message: "What is the role the new employee? (enter ID number)",
    },
    {
      type: "input",
      name: "manager",
      message: "Who will the new hire report to? (enter ID number)?",
    },
  ])
  .then(function (res) {
    db.connection.query("INSERT INTO employee SET ?",
    {
      first_name: res.firstName,
      last_name: res.lastName,
      role_id: res.role,
      manager_id: res.manager,
    },
    function(err, res) {
      if (err) throw (err);
      viewAllEmployees();
    });
  });
};


function addNewDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What would you like to call this new department?",
    },
  ])
  .then(function (res) {
    db.connection.query("INSERT INTO department SET ?",
    {
      name: res.name
    },
    function(err, res) {
      if (err) throw (err);
      viewAllDepartments();
    });
  });
};


function addNewRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of this new role?",
    },
    {
      type: "input",
      name: "salary",
      message: "How much does this new role pay? (numbers only)",
    },
    {
      type: "input",
      name: "department",
      message: "What department will this role be in? (enter the ID number)", 
    },
  ])
  .then(function (res) {
    db.connection.query("INSERT INTO role SET ?",
    {
      title: res.name,
      salary: res.salary,
      department_id: res.department,
    },
    function(err, res) {
      if (err) throw (err);
      viewAllRoles();
    });
  });
};


function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "employee",
      message: "What employee would you like to update? (Enter Emp ID number)",
    },
    {
      type: "input",
      name: "role",
      message: "What role would you like this employee to have? (Enter Role ID number)",
    },
  ])
  .then(function (res) {
    db.connection.query("UPDATE employee SET role_id=? WHERE id=?",[res.role, res.employee],
    function(err, res) {
      if (err) throw (err);
      viewAllEmployees();
    });
  });
};


function updateEmployeeMgr() {
  inquirer.prompt([
    {
      type: "input",
      name: "employee",
      message: "What employee would you like to update? (Enter Emp ID number)",
    },
    {
      type: "input",
      name: "manager",
      message: "Who should this employee report to? (Enter Manager ID number)",
    },
  ])
  .then(function (res) {
    db.connection.query("UPDATE employee SET manager_id=? WHERE id=?",[res.manager, res.employee],
    function(err, res) {
      if (err) throw (err);
      viewAllEmployees();
    });
  });
};


function quitApplication() {
  db.connection.end();
  console.log("Application Terminated");
  process.exit(0);
};


// Inquirer

function cmsMain() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'actionChoice',
      message: 'What would you like to do?',
      choices: ["View All Employees", "View Employees by Manager", "Add New Employee", "Update Employee's Role", "Update Employee's Manager", "View All Departments", "View Department Budget Spent", "Add New Department", "View All Roles", "Add New Role", "Exit Application", new inquirer.Separator()],
      loop: 'false',
    },
  ])
  .then(function (res) {
    switch (res.actionChoice) {
      case "View All Employees":
        viewAllEmployees();
        break;
      case "View Employees by Manager":
        viewEmployeeByManager();
        break;
      case "Add New Employee":
        addNewEmployee();
        break;
      case "Update Employee's Role":
        updateEmployeeRole();
        break;
      case "Update Employee's Manager":
        updateEmployeeMgr();
        break;
      case "View All Departments":
        viewAllDepartments();
        break;
      case "View Department Budget Spent":
        viewDepartmentBudget();
        break;
      case "Add New Department":
        addNewDepartment();
        break;
      case "View All Roles":
        viewAllRoles();
        break;
      case "Add New Role":
        addNewRole();
        break;
      default:
        quitApplication();
        break;
    }
  });
};

module.exports = {viewAllDepartments, viewAllEmployees, viewAllRoles, quitApplication, cmsMain};