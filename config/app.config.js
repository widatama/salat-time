// All paths are from app root

function hashOrPlain() {
  if (process.env.NODE_ENV === 'production') {
    return '[chunkhash]';
  }

  return 'bundle';
}


const config = {
  distPath: 'public',
  srcPath: 'src',
  templatePath: 'src/templates',
  configPath: 'config',
  title: 'Salat Time',
  bundleNames: {
    js: `[name]-${hashOrPlain()}.js`,
    css: `[name]-${hashOrPlain()}.css`,
    images: '[name].[ext]',
  },
  paths: {
    config: 'config',
    src: {
      path: 'src',
      templatePath: 'templates',
      javascriptsPath: 'javascripts',
      stylesheetsPath: 'stylesheets',
    },
    asset: {
      path: 'assets',
      imagesPath: 'images',
    },
    dist: {
      path: 'public',
      javascriptsPath: 'assets/javascripts',
      stylesheetsPath: 'assets/stylesheets',
      imagesPath: 'assets/images',
    },
  },
  external: {
    geoLocationService: 'https://nominatim.openstreetmap.org/reverse?format=json&zoom=15&addressdetails=1',
    geoIPService: 'https://freegeoip.net/json/',
    salatTimeService: 'https://api.aladhan.com/timings/',
  },
};

module.exports = config;
