
/*All path is from app root*/

var config = {
  distPath:     "public",
  appPath:      "app",
  templatePath: "app/templates",
  configPath:   "config",
  external: {
    geoLocationService: "https://nominatim.openstreetmap.org/reverse?format=json&zoom=15&addressdetails=1",
    geoIPService:       "https://freegeoip.net/json/",
    salatTimeService:   "https://api.aladhan.com/timings/"
  }
};

module.exports = config;
