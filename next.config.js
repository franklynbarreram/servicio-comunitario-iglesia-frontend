const path = require("path");
const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    // disable: process.env.NODE_ENV === "development",
    disable: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
});
