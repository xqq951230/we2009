const path = require('path')
const defaultSettings = require('./src/settings.js')
function resolve(dir) {
    return path.join(__dirname, dir)
  }


module.exports = {
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: defaultSettings.title,
        resolve: {
          alias: {
            '@': resolve('src')
          }
        }
      },
}