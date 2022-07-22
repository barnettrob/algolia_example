const { Router } = require("express");
const algoliaRouter = Router();

const {
  getAlgoliaMovieRecords,
  indexToAlgolia,
  getSingleAlgoliaRecord,
  updateSingleAlgoliaRecord,
} = require("../lib/algoliaClient");

algoliaRouter.get("/index", async (req, res) => {
  const movies = await getAlgoliaMovieRecords()
    .then((response) => {
      return response;
    })
    .catch((e) => {
      console.error(`${e.message}`);
      return false;
    });

  if (movies.length > 0) {
    indexToAlgolia(movies)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.error("indexToAlgolia error:", e.message);
        return res.status(500).send("Something went wrong indexing");
      });
  }

  res.send(`Movies have been indexed.`);
});

algoliaRouter.get("/movies/:objectId", async (req, res) => {
  if (!req.params.objectId) {
    return res.status(400).send("Missing objectId for Algolia record");
  }

  const record = await getSingleAlgoliaRecord(req.params.objectId)
    .then((object) => {
      return object;
    })
    .catch((e) => {
      console.error(`getSingleAlgoliaRecord error: ${e.message}`);
      return false;
    });

  return res.send(record);
});

algoliaRouter.patch("/movies", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Body required");
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("Body cannot be empty");
  }

  if (!("objectID" in req.body)) {
    return res.status(400).send("Body must include objectID");
  }

  const updatedRecord = await updateSingleAlgoliaRecord(req.body)
    .then((object) => {
      return object;
    })
    .catch((e) => {
      console.error(`updateSingleAlgoliaRecord error: ${e.message}`);
      return false;
    });

  return res.send(`${updatedRecord} record updated`);
});

module.exports = {
  algoliaRouter,
};
