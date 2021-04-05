if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/react-responsive-menu.production.min.js')
} else {
  module.exports = require('./dist/react-responsive-menu.development.js')
}
