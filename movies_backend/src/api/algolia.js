const { Router } = require("express");
const algoliaRouter = Router();

const {
  getAlgoliaMovieRecords,
  indexToAlgolia,
  getSingleAlgoliaRecord,
  updateSingleAlgoliaRecord,
} = require("../lib/algoliaClient");

algoliaRouter.post("/index/all-movies", async (req, res) => {
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

algoliaRouter.get("/movies/:uuid", async (req, res) => {
  if (!req.params.uuid) {
    return res.status(400).send("Missing uuid for Algolia record");
  }

  const record = await getSingleAlgoliaRecord(req.params.uuid)
    .then((object) => {
      return object;
    })
    .catch((e) => {
      console.error(`getSingleAlgoliaRecord error: ${e.message}`);
      return false;
    });

  return res.send(record);
});

algoliaRouter.put("/movies/:uuid", async (req, res) => {
  if (!req.params.uuid) {
    return res.status(400).send("Missing uuid for Algolia record");
  }

  if (!req.body) {
    return res.status(400).send("Body required");
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("Body cannot be empty");
  }

  // uuid (ObjectID) needs to be in body for Algolia partial update.
  req.body["objectID"] = req.params.uuid;

  const updatedRecord = await updateSingleAlgoliaRecord(req.body)
    .then((object) => {
      return object;
    })
    .catch((e) => {
      console.error(`updateSingleAlgoliaRecord error: ${e.message}`);
      return false;
    });

  return res.send({ objectId: updatedRecord });
});

module.exports = {
  algoliaRouter,
};
