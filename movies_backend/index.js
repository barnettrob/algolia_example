const express = require("express");
const app = express();
const { expressPort } = require("./config");
const {
  getAlgoliaMovieRecords,
  indexToAlgolia,
  getSingleAlgoliaRecord,
  updateSingleAlgoliaRecord,
} = require("./algoliaClient.js");

// Middleware to handle body in requests.
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send(
    "Welcome to Algolia index api.  Go to /index to index movie items from https://github.com/algolia/datasets/blob/master/movies/records.json"
  );
});

app.get("/index", async (req, res) => {
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

app.get("/record/:objectId", async (req, res) => {
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

app.patch("/record", async (req, res) => {
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

app.listen(expressPort, function () {
  console.log(`Algolia api is listening on port ${expressPort}`);
});
