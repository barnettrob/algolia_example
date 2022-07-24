const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  expressPort: process.env.EXPRESS_PORT,
  algolia: {
    dataset: process.env.ALGOLIA_DATASET,
    applicationId: process.env.ALGOLIA_APP_ID,
    searchApiKey: process.env.ALGOLIA_SEARCH_API_KEY,
    adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
    index: process.env.ALGOLIA_INDEX,
  },
  basicAuthentication: {
    user: process.env.BASIC_AUTH_USER,
    password: process.env.BASIC_AUTH_PASS,
  },
};
