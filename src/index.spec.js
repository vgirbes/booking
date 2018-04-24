const context = require.context('./tests', true, /\.(js|ts|tsx)$/);
context.keys().forEach(context);
