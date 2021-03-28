const title = 'Salat Time';

module.exports = {
  chainWebpack(config) {
    config.plugin('html').tap(args => {
      args[0].title = title;
      args[0].favicon = 'public/favicon.png';

      return args;
    });
  },
  devServer: {
    https: true,
    port: 9876,
  },
  lintOnSave: false,
  pwa: {
    name: title,
    themeColor: '#ffffff',
    manifestOptions: {
      background_color: '#333333',
      icons: [
        {
          src: "./favicon.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "./favicon.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "./favicon.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "./favicon.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        },
      ],
    },
    iconPaths: {
      favicon32: 'favicon.png',
      favicon16: 'favicon.png',
      appleTouchIcon: 'favicon.png',
      maskIcon: 'favicon.png',
      msTileImage: 'favicon.png',
    },
  },
  publicPath: './',
};
