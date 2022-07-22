const Router = require("express");
const { algoliaRouter } = require("./algolia");

const apiRouter = Router();

apiRouter.use("/v1", algoliaRouter);

module.exports = {
  apiRouter,
};
