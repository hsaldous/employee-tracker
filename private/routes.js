const path = require("path");
const fs = require("fs");
const db = require("./db");
const tools = require("./tools");
const cTable = require('console.table');

module.exports = function(app) {
  
  // API routes
  // GET requests

  app.get("/all-employees", function(req, res) {
    tools.viewAllEmployees();
  });

  app.get("/all-departments", function(req, res) {
    tools.viewAllDepartments();
  });

  app.get("/all-roles", function(req, res) {
    tools.viewAllRoles();
  });

// API post requests

  app.get("*", function(req, res) {
    db.connection.query("SELECT 1", function(err, result) {
      if (err) throw err;
      var html = "<h1> Choose one of the following to test:</h1>";
      html += "<ul>";
      html += "<li><p><a href='/all-employees'>View All Employees</a></p>";
      html += "<li><p><a href='/all-departments'>View All Departments</a></p>";
      html += "<li><p><a href='/all-roles'>View All Roles</a></p>";
      html += "<li><p><a href='/all-departments'>Future Use</a></p>";
      html += "</ul>";
      res.send(html);
    });
  });

};

// Functions

function viewAllEmployees() {
  db.connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    console.table(res);
    cmsMain();
  });
};