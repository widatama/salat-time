
/*All path is from app root*/

var config = {
  distPath:     "public",
  appPath:      "app",
  templatePath: "app/templates",
  configPath:   "config",
  external: {
    geoService:       "http://geoip.nekudo.com",
    salatTimeService: "http://api.aladhan.com"
  }
};

module.exports = config;
