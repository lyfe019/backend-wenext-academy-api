// backend-api/cucumber.js
module.exports = {
  default: `--format-options '{"snippetInterface": "synchronous"}' --require-module @babel/register --require ./step_definitions/**/*.js features/**/*.feature`,
};