var path =     require("path");
var config =   require("../config/app.config");
var executor = require("./executor");

var rootPath = path.join(__dirname, "..");

var compileCommand =
  "jade " + path.join(rootPath, config.templatePath) +
  " --out " + path.join(rootPath, config.distPath);

var watchCommand =
  "fsmonitor -s -d " + path.join(rootPath, config.templatePath) + " '+*.jade' -p " +
  compileCommand;

if (process.argv[2] === "watch") {
  executor(watchCommand);
}
else {
  executor(compileCommand);
}
