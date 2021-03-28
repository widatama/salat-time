const context = require.context('.', true, /\.(spec|test)\.(js|ts)$/);

context.keys().forEach(context);
