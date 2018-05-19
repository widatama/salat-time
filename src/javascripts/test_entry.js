const context = require.context('.', true, /\.(spec|test)\.js$/);

context.keys().forEach(context);

