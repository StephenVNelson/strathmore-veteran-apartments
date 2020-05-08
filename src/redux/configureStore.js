if (process.env.NOCE_ENV === "production") {
  module.exports = require("./configureStore.prod")
} else {
  module.exports = require("./configureStore.dev")
}