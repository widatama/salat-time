var exec = require("child_process").exec;

function puts(error) {

  if (error !== null) {
    console.log("exec error: " + error);
  }
}

var executor = function (command) {
  console.log("> " + command + "\n");
  exec(command, puts);
};

module.exports = executor;
