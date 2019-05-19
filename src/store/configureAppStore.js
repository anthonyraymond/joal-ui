if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureAppStore.prod');
} else {
  module.exports = require('./configureAppStore.dev');
}
