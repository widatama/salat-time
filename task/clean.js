var path =     require("path");
var config =   require("../config/app.config");
var executor = require("./executor");

var rootPath = path.join(__dirname, "..");

executor("rm -rf " + path.join(rootPath, config.distPath));
