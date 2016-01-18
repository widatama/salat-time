
/*All path is from app root*/

var config = {
  distPath:     "public",
  appPath:      "app",
  templatePath: "app/templates",
  configPath:   "config",
  external: {
    geoService:         "http://nominatim.openstreetmap.org/",
    praytimeService:    "http://www.muslimsalat.com/daily.json",
    praytimeServiceKey: "c40b0d3e27ac71c22ef5942aa8abfca7"
  }
};

module.exports = config;
