var context = require.context('./src', true, /.+\.unit\.jsx?$/);
context.keys().forEach(context);
module.exports = context;
