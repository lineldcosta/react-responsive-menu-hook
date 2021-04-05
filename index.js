if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/react-responsive-menu-hook.production.min.js')
} else {
  module.exports = require('./dist/react-responsive-menu-hook.development.js')
}
