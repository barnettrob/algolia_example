const { Router } = require("express");
const algoliaRouter = Router();

const {
  getAlgoliaMovieRecords,
  indexToAlgolia,
  addSingleAlgoliaRecord,
  getSingleAlgoliaRecord,
  updateSingleAlgoliaRecord,
} = require("../lib/algoliaClient");

// Index all movies from Algolia's github to Algolia index.
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
        return res.status(500).send("Something went wrong indexing records");
      });
  }

  res.send("Movies have been indexed.");
});

// Add a new movie object to Algolia.
algoliaRouter.post("/movies", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Body required");
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("Body cannot be empty");
  }

  const record = await addSingleAlgoliaRecord(req.body)
    .then((response) => {
      return response;
    })
    .catch((e) => {
      console.error("addSingleAlgoliaRecord error:", e.message);
      return false;
    });

  return res.send(record);
});

// Get a movie object from Algolia's index.
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

// Update a movie object.
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
