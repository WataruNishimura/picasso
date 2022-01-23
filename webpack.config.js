const defaultConfig = require("@wordpress/scripts/config/webpack.config")
const path = require("path")

defaultConfig.entry = {
  "index": path.resolve(process.cwd(), "src", "index.js"),
  "admin/settings/basic": path.resolve(process.cwd(), "src", "admin/settings", "basic.js"),
  "admin/edit/index": path.resolve(process.cwd(), "src", "admin/edit", "index.js")
}

defaultConfig.output = {
  filename: '[name].js',
  path: path.resolve( process.cwd(), 'build'),
}

module.exports  = {
  ...defaultConfig
}