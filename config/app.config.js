
/*All path is from app root*/

var config = {
  distPath:     "public",
  appPath:      "app",
  templatePath: "app/templates",
  configPath:   "config",
  external: {
    geoService:         "https://nominatim.openstreetmap.org",
    praytimeService:    "https://www.muslimsalat.com",
    praytimeServiceKey: "c40b0d3e27ac71c22ef5942aa8abfca7"
  }
};

module.exports = config;
