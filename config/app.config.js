
/*All path is from app root*/

var config = {
  distPath:     "public",
  appPath:      "app",
  templatePath: "app/templates",
  configPath:   "config",
  external: {
    geoService:       "https://freegeoip.net/json/",
    salatTimeService: "https://api.aladhan.com"
  }
};

module.exports = config;
